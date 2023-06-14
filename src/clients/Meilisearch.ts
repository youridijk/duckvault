import { MeiliSearch } from 'meilisearch';
import settings from '../Settings';

const client = new MeiliSearch({
  host: settings.meilisearchUrl,
  apiKey: process.env.MEILISEARCH_SEARCH_KEY,
});

export default client;
