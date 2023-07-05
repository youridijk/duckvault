// ALl other types from e.g. views from the db
import { Issue, Entry, Entryurl } from './Inducks';

export interface EquivCount {
  equivid: number;
  equiv_count: number;
}

export interface FullEntryUrl extends Omit<Entryurl, 'url'> {
  fullurl: string;
}

export interface EntryWithImages extends Entry {
  original_entry_urls: FullEntryUrl[];
  story_entry_urls: FullEntryUrl[];
}

export interface IssueWithImages extends Issue {
  image_urls: FullEntryUrl[];
}

// Issue type for the issue detail page
export interface IssueDetailPageIssue extends IssueWithImages {
  entry: EntryWithImages[];
  userOwnsIssue: boolean;
}

export interface Equivalent {
  issuecode: string;
  equivid: number;
  equivcomment: string;
  issue: Issue;
}

export interface IssueImage extends FullEntryUrl {
  issuecode: string;
}
