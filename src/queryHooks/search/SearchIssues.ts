import settings from '../../Settings';
import MeilisearchResponse from '../../types/meilisearch/MeilisearchResponse';
import MeilisearchIssue from '../../types/meilisearch/MeilisearchIssue';
import meilisearch from '../../clients/Meilisearch';
import { SearchParams } from 'meilisearch';

export async function searchWithLibrary(searchQuery: string, language?: string, filteredCategories?: string[]) {
  const options: SearchParams = {
    sort: ['oldestdate:desc', 'filledoldestdate:desc'],
    filter: searchQuery === '' ?
      ['languagecode = ' + language, 'filledoldestdate != 9999-12-31', 'filter_categories NOT IN ' + JSON.stringify(filteredCategories)] :
      ['issuerangecode IS NULL'],
  };

  console.log(meilisearch);
  console.log(process.env.MEILISEARCH_SEARCH_KEY);

  return meilisearch
    .index<MeilisearchIssue>('issues')
    .search(
      searchQuery,
      options,
    );
}

async function searchWithFetch(searchQuery: string, language?: string): Promise<MeilisearchResponse<MeilisearchIssue>> {
  const url = `${settings.meilisearchUrl}/indexes/issues/search`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.MEILISEARCH_SEARCH_KEY,
  };

  const body = {
    q: searchQuery,
    filter: searchQuery === '' ? ['languagecode = ' + language, 'filledoldestdate != 9999-12-31'] : ['issuerangecode IS NULL'],
    sort: ['oldestdate:desc', 'filledoldestdate:desc'],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
}
