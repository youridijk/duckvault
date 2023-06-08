export default interface Equivalent {
  issuecode: string;
  equivid: number;
  equivcomment: string;
  issue: {
    issuecode: string;
    title: string;
    issuenumber: number;
    entry: {
      entrycode: string;
      full_entryurl: {
        sitecode: string;
        fullurl: string;
      }[];
    }[];
    publication: {
      title: string;
      country: {
        coutrycode: string;
        countryname: string;
      };
    };
  };
}
