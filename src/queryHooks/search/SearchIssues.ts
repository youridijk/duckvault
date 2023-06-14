import { useQuery } from '@tanstack/react-query';
import settings from '../../Settings';
import MeilisearchResponse from '../../types/meilisearch/MeilisearchResponse';
import MeilisearchIssue from '../../types/meilisearch/MeilisearchIssue';
import { useTranslation } from 'react-i18next';
import meilisearch from '../../clients/Meilisearch';
import { MeiliSearch, SearchParams } from 'meilisearch';

export default function useSearchIssues(searchQuery: string) {
  const { i18n } = useTranslation();

  return useQuery<MeilisearchResponse<MeilisearchIssue>, Error>({
    queryKey: ['search_issues', searchQuery],
    queryFn: () => searchWithLibrary(searchQuery, i18n.resolvedLanguage),
  });
}


// Only create the client once
const client = new MeiliSearch({
  host: settings.meilisearchUrl,
  apiKey: process.env.MEILISEARCH_SEARCH_KEY,
});

function searchTest(searchQuery: string) {
  return client
    .index<MeilisearchIssue>('issues')
    .search(searchQuery);
}


export async function searchWithLibrary(searchQuery: string, language?: string) {
  const options: SearchParams = {
    sort: ['oldestdate:desc', 'filledoldestdate:desc'],
    filter: searchQuery === '' ? ['languagecode = ' + language, 'filledoldestdate != 9999-12-31'] : ['issuerangecode IS NULL'],
  };

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
