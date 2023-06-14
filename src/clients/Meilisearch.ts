import { MeiliSearch } from 'meilisearch';
import { MEILISEARCH_MASTER_KEY } from '@env';
import settings from '../Settings';

const client = new MeiliSearch({
  host: settings.meilisearchUrl,
  apiKey: MEILISEARCH_MASTER_KEY,
});

export default client;
