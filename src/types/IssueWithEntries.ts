import Issue from './Issue';

export default interface IssueWithEntries extends Issue {
  equiv_count: {
    equiv_count: number;
  }[];
  entry: {
    title: string;
    reallytitle: boolean;
    printedhero: string;
    image_urls: string;
    storyversion: {
      storyversioncode: string;
      kind: string;
      storydescription: {
        languagecode: string;
        desctext: string;
      }[];
      story: {
        storycode: string;
        firstpublicationdate: string;
        storycomment: string;
        title: string;
      };
    };
  }[];
}
