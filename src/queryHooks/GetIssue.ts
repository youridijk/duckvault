import { useQuery } from '@tanstack/react-query';
import settings from '../Settings';
import { IssueDetailPageIssue } from '../types/db/Custom';


async function getIssue(issueCode: string, signal?: AbortSignal): Promise<IssueDetailPageIssue> {
  const url = `${settings.postgrestUrl}/issue_with_images?issuecode=eq.${issueCode}&select=*,equiv_count(equivid, equiv_count),publication(title),entry:entry_with_images(entrycode,title,reallytitle,printedhero,sideways, original_entry_urls, story_entry_urls, storyversion(storyversioncode,kind,story!fk_storyversion_storycode_storycode(storycode,firstpublicationdate,storycomment, title), storydescription(languagecode, desctext)))&entry_with_images.storyversion.storydescription.languagecode=eq.en`;
  const headers = {
    Accept: 'application/vnd.pgrst.object+json',
  };

  const response = await fetch(url, {
    headers,
    signal,
  });

  const responseBody = await response.json();

  if (response.ok) {
    return responseBody;
  }

  return Promise.reject(responseBody);
}

async function getUserOwnsIssue(issueCode: string, authHeaders: Record<string, string>, signal?: AbortSignal): Promise<boolean> {
  const url = `${settings.backendUrl}/user/owned_issues/has/${issueCode}`;
  const ownedIssueResponse = await fetch(url, {
    headers: authHeaders,
    signal,
  });

  const ownedIssueResponseBody = await ownedIssueResponse.json();

  if (!ownedIssueResponse.ok) {
    return Promise.reject(ownedIssueResponse);
  }

  return ownedIssueResponseBody.owns_issue;
}

export default function useIssue(issueCode: string, authHeaders: Record<string, string>) {
  return useQuery({
    queryKey: ['issue', issueCode],
    queryFn: async ({signal}) => {
      const [
        issueResult,
        userOwnsIssueResult,
      ] = await Promise.allSettled([
        getIssue(issueCode, signal),
        getUserOwnsIssue(issueCode, authHeaders, signal),
      ]);

      if (issueResult.status === 'rejected') {
        return Promise.reject(issueResult.reason);
      }

      const issueData = issueResult.value;

      if (userOwnsIssueResult.status === 'rejected') {
        console.log('owned', userOwnsIssueResult.reason);
      } else {
        issueData.userOwnsIssue = userOwnsIssueResult.value;
      }

      return issueResult.value;
    },
  });
}
