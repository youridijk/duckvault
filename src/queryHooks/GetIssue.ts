import { useQuery } from '@tanstack/react-query';
import settings from '../Settings';
import { IssueDetailPageIssue } from '../types/db/Custom';

export default function useIssue(issueCode: string) {
  const url = `${settings.postgrestUrl}/issue_with_images?issuecode=eq.${issueCode}&select=*,equiv_count(equivid, equiv_count),publication(title),entry:entry_with_images(title,reallytitle,printedhero,original_entry_urls, story_entry_urls, storyversion(storyversioncode,kind,story!fk_storyversion_storycode_storycode(storycode,firstpublicationdate,storycomment, title), storydescription(languagecode, desctext)))&entry_with_images.storyversion.storydescription.languagecode=eq.en`;

  return useQuery<IssueDetailPageIssue, Error>({
    queryKey: ['issue', issueCode],
    queryFn: async () => {
      const headers = {
        Accept: 'application/vnd.pgrst.object+json',
      };

      const response = await fetch(url, {
        headers,
      });

      const responseBody = await response.json();

      if (response.ok) {
        return responseBody;
      }

      return Promise.reject(responseBody);
    },
  });
}
