import { MeiliSearch } from 'meilisearch';
import settings from '../Settings';

console.log(process.env.MEILISEARCH_SEARCH_KEY);
const client = new MeiliSearch({
  host: settings.meilisearchUrl,
  apiKey: process.env.MEILISEARCH_SEARCH_KEY,
});

export default client;
