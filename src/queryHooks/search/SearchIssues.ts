import {useQuery} from '@tanstack/react-query';
import settings from '../../Settings';
import MeilisearchResponse from '../../types/meilisearch/MeilisearchResponse';
import MeilisearchIssue from '../../types/meilisearch/MeilisearchIssue';
import { MEILISEARCH_MASTER_KEY } from '@env';

export default function useSearchIssues(searchQuery: string) {
  const url = `${settings.meilisearchUrl}/indexes/issues/search`;

  return useQuery<MeilisearchResponse<MeilisearchIssue>, Error>({
    queryKey: ['search_issues', searchQuery],
    queryFn: async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + MEILISEARCH_MASTER_KEY,
      };

      const body = {
        q: searchQuery,
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
    },
  });
}
