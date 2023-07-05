import { useQuery } from '@tanstack/react-query';
import settings from '../Settings';

type PrivateCollectionResponse = {
  summary: string;
};
export default function usePrivateCollectionProfile(authHeaders: Record<string, string>) {
  return useQuery({
    queryKey: ['private-collection-profile'],
    queryFn: async ({ signal }) => {
      const privateCollectionResponse = await fetch(
        `${settings.backendUrl}/user/owned_issues?compact=1`,
        {
          headers: authHeaders,
          signal,
        });

      const privateCollectionResponseBody: PrivateCollectionResponse = await privateCollectionResponse.json();
      if (!privateCollectionResponse.ok) {
        return Promise.reject(privateCollectionResponseBody);
      }

      const issuesDataURL = `${settings.postgrestUrl}/rpc/get_issues_with_images?issue_codes={${privateCollectionResponseBody.summary}}&select=*, publication(title)`;
      const issuesDataResponse = await fetch(
        issuesDataURL,
        {
          signal,
        });

      const issuesDataResponseBody = await issuesDataResponse.json();

      if (!issuesDataResponse.ok) {
        return Promise.reject(issuesDataResponseBody);
      }

      return issuesDataResponseBody;
    },
  });

  return useQuery({
    queryKey: ['is'],
    queryFn: () => {

    },
  });
}
