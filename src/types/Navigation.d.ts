import { NativeStackScreenProps } from '@react-navigation/native-stack';

type IssueDetailParamList = {
  IssueDetail: {
    issue: {
      issueCode: string;
      title: string;
    };
  };
};

export type SearchStackParamList = IssueDetailParamList & {
  Search: undefined;
};

export type LoginStackParamList = {
  Login: undefined;
  TabBar: undefined;
};

export type ProfileStackParamList = IssueDetailParamList & {
  Profile: undefined;
  PrivateCollection: undefined;
};

export type IssueDetailScreenProps = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;
export type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;
export type PrivateCollectionScreenProps = NativeStackScreenProps<ProfileStackParamList, 'PrivateCollection'>;
