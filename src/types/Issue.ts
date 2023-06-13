export default interface Issue {
  issuecode: string;
  issuerangecode?: string;
  publicationcode: string;
  issuenumber: string;
  title: string;
  size?: number;
  pages: string;
  price: string;
  printrun: string;
  attached: null;
  oldestdate: string;
  fullyindexed: boolean;
  issuecomment?: string;
  error: false;
  filledoldestdate: string;
  locked: boolean;
  inxforbidden: boolean;
  inputfilecode: number;
  maintenanceteamcode: string;
  image_urls: IssueImageUrl[];
  publication: {title: string};
}

interface IssueImageUrl {
  entrycode: string;
  fullurl: string;
}
