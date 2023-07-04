export type SearchStackParamList = {
  Search: undefined;
  IssueDetail: {
    issue: {
      issueCode: string;
      title: string;
    };
  };
};

export type LoginStackParamList = {
  Login: undefined;
  TabBar: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  PrivateCollection: undefined;
};
