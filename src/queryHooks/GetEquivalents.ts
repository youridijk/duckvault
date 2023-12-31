import settings from '../Settings';
import { useQuery } from '@tanstack/react-query';
import { Equivalent } from '../types/db/Custom';

export default function useEquivalents(issueCode: string) {
  const url = `${settings.postgrestUrl}/rpc/get_issue_equivalents?issue_code=${issueCode}&select=*,issue(issuecode, title, issuenumber, publication(title, country(countrycode, countryname)), entry(entrycode, full_entryurl(sitecode, fullurl)))&issue.entry.position=eq.a`;

  return useQuery<Equivalent[], Error>({
    queryKey: ['issue_equivalents', issueCode],
    queryFn: async ({signal}) => {
      const response = await fetch(url, {
        signal,
      });
      return response.json();
    },
  });
}
