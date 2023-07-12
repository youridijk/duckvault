import '@env';
export default {
  imageProxyUrl: process.env.IMAGE_PROXY_URL ?? 'https://duckvault.dijk.cc/imageproxy',
  postgrestUrl: process.env.POSTGREST_URL ?? 'https://duckvault.dijk.cc/api/postgrest',
  meilisearchUrl: process.env.MEILISEARCH_URL ?? 'https://meilisearch.dijk.cc',
  backendUrl: process.env.BACKEND_URL ?? 'https://duckvault.dijk.cc/api/laravel',
};
