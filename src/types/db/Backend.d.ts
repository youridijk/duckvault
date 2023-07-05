import { Issue } from './Inducks';
import { IssueImage } from './Custom';

export interface BackendTimeStamps {
  created_at: string;
  updated_at: string;
}

export interface BackendIssue extends Issue {
  images: IssueImage[];
}

export interface PrivateCollectionIssue extends BackendTimeStamps {
  issue_code: string;
  user_id: number;
  issue: BackendIssue;
}
