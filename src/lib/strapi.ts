interface Props {
	endpoint: string;
	query?: Record<string, string>;
	wrappedByKey?: string;
	wrappedByList?: boolean;
}

interface IStrapiMeta {
	pagination?: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}

interface IStrapiData<T> {
	id: string;
	attributes: T;
	meta?: {
		availableLocales?: string[];
	};
}

interface IStrapiResponse<T> {
	data: IStrapiData<T>[] | IStrapiData<T>;
	meta: IStrapiMeta;
}

export default async function fetchApi<T>({
	endpoint,
	query,
	wrappedByKey,
	wrappedByList,
}: Props): Promise<IStrapiResponse<T>> {
	if (endpoint.startsWith('/')) {
		endpoint = endpoint.slice(1);
	}

	const apiHost =
		import.meta.env.NODE_ENV === 'development'
			? import.meta.env.TEST_API_URL
			: import.meta.env.STRAPI_URL;

	const HOST = `${apiHost}/api/${endpoint}`;
	const url = new URL(HOST);

	if (query) {
		const queryKeys = Object.keys(query);
		const loopLimit = queryKeys.length < 50 ? queryKeys.length : 50;
		for (let i = 0; i < loopLimit; i++) {
			url.searchParams.append(queryKeys[i], query[queryKeys[i]]);
		}
	}

	const response = await fetch(url.toString());
	let data = await response.json();

	if (wrappedByKey) data = data[wrappedByKey];
	if (wrappedByList) data = data[0];

	return data as IStrapiResponse<T>;
}
