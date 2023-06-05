import {useQuery} from '@tanstack/react-query';
import settings from '../Settings';
import IssueWithEntries from '../types/IssueWithEntries';

import issue from './issue.json';

export default function useIssue(issueCode: string) {
  const url = `${settings.postgrestUrl}/issue?issuecode=eq.${issueCode}&select=*,entry(title,reallytitle,printedhero, storyversion(storyversioncode,kind,story!fk_storyversion_storycode_storycode(storycode,firstpublicationdate,storycomment, title)))`;

  return useQuery<IssueWithEntries, Error>({
    queryKey: [`issue_${issueCode}`],
    queryFn: async () => {
      const headers = {
        Accept: 'application/vnd.pgrst.object+json',
      };

      // const response = await fetch(url, {
      //   headers,
      // });
      // return response.json();
      return issue as unknown as IssueWithEntries;
    },
  });
}
