import {useQuery} from '@tanstack/react-query';
import settings from '../Settings';
import IssueWithEntries from '../types/IssueWithEntries';

export default function useIssue(issueCode: string) {
  const url = `${settings.postgrestUrl}/issue_with_images?issuecode=eq.${issueCode}&select=*,equiv_count(equivid, equiv_count),publication(title),entry(title,reallytitle,printedhero, storyversion(storyversioncode,kind,story!fk_storyversion_storycode_storycode(storycode,firstpublicationdate,storycomment, title), storydescription(languagecode, desctext)))&entry.storyversion.storydescription.languagecode=eq.en`;

  return useQuery<IssueWithEntries, Error>({
    queryKey: ['issue', issueCode],
    queryFn: async () => {
      const headers = {
        Accept: 'application/vnd.pgrst.object+json',
      };

      const response = await fetch(url, {
        headers,
      });

      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response);
    },
  });
}
