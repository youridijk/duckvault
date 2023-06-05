import {useQuery} from '@tanstack/react-query';
import Issue from '../types/Issue';
import settings from '../Settings';

export default function useIssue(issueCode: string) {
  const url = `${settings.postgrestUrl}/issue?issuecode=eq.${issueCode}&select=*,entry(title,reallytitle,printedhero, storyversion(storyversioncode,kind,story!fk_storyversion_storycode_storycode(storycode,firstpublicationdate,storycomment, title)))`;

  return useQuery<Issue>({
    queryKey: ['issues'],
    queryFn: async () => {
      const response = await fetch(url);
      return (await response.json())[0];
    },
  });
}
