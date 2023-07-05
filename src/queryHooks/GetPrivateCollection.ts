import { useInfiniteQuery } from '@tanstack/react-query';
import settings from '../Settings';
import { PrivateCollectionIssue } from '../types/db/Backend';
import queryString from 'query-string';

export function usePrivateCollection(authHeaders: Record<string, string>, limit: number) {
  return useInfiniteQuery<PrivateCollectionIssue[]>({
    queryKey: ['private-collection-me', limit],
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length * limit : undefined;
    },
    queryFn: async ({ signal, pageParam = 0 }) => {
      const searchParams = {
        limit,
        offset: pageParam,
      };
      const url = `${settings.backendUrl}/user/owned_issues?` + queryString.stringify(searchParams);
      const privateCollectionResponse = await fetch(url,
        {
          headers: authHeaders,
          signal,
        });

      const privateCollectionResponseBody = await privateCollectionResponse.json();

      if (!privateCollectionResponse.ok) {
        return Promise.reject(privateCollectionResponseBody);
      }

      return privateCollectionResponseBody;
    },
  });
}
