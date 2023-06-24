import { MeiliSearch } from 'meilisearch';
import settings from '../Settings';

console.log('M ' + process.env.MEILISEARCH_SEARCH_KEY);
const client = new MeiliSearch({
  host: settings.meilisearchUrl,
  apiKey: process.env.MEILISEARCH_SEARCH_KEY ?? '4456fb43dd0732f319d13d2ad1e04979fc61dd6ec593ad6dfa7bd530fa89c553',
});

export default client;
