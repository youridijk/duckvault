import { IssueImageUrl } from '../Issue';

export default interface MeilisearchIssue {
  id: string,
  issuecode: string;
  issuerangecode?: string;
  publicationcode: string;
  issue_title: string;
  issuenumber: string;
  oldestdate?: string;
  filledoldestdate: string;
  fullyindexed: true;
  publicaton_title: string;
  publication_title_issue_number: string;
  full_title: string;
  countrycode: string;
  languagecode: string;
  image_urls: IssueImageUrl[];
}
