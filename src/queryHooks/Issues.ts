import settings from '../Settings';
import {useQuery} from '@tanstack/react-query';
import {Issue} from '../types/Issue';

const url = `${settings.postgrestUrl}/issue_with_images?select=*,publication(title)&publicationcode=eq.nl/PO3&order=filledoldestdate.desc&limit=10&pages=neq.1`;
export function useIssues() {
  return useQuery<Issue[], Error>({
    queryKey: ['issues'],
    queryFn: async () => {
      const response = await fetch(url);
      return response.json();
    },
  });
}
