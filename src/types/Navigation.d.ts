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
  Registration: undefined;
  TabBar: undefined;
};

export type ProfileStackParamList = IssueDetailParamList & {
  Profile: undefined;
  PrivateCollection: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;
export type RegistrationScreenProps = NativeStackScreenProps<LoginStackParamList, 'Registration'>;
export type TabBarProps = NativeStackScreenProps<LoginStackParamList, 'TabBar'>;
export type IssueDetailScreenProps = NativeStackScreenProps<IssueDetailParamList, 'IssueDetail'>;
export type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;
export type PrivateCollectionScreenProps = NativeStackScreenProps<ProfileStackParamList, 'PrivateCollection'>;
