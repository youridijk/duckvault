import Issue from './Issue';

export default interface IssueWithEntries extends Issue {
  entry: {
    title: string;
    reallytitle: boolean;
    printedhero: string;
    image_urls: string;
    storyversion: {
      storyversioncode: string;
      kind: string;
      story: {
        storycode: string;
        firstpublicationdate: string;
        storycomment: string;
        title: string;
      };
    };
  }[];
};
