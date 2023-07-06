import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

export type IssueDetailScreenProps = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;
export type PrivateCollectionScreenProps = NativeStackScreenProps<ProfileStackParamList, 'PrivateCollection'>;
