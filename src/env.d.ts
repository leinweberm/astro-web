/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	NODE_ENV: 'development' | 'production';
	TEST_API_URL: string;
	STRAPI_URL: string;
}
