import { FastImageProps, Priority, Source } from 'react-native-fast-image';
import { PressableProps, TouchableWithoutFeedbackProps } from 'react-native';
import { ProfileStackParamList } from './Navigation';
import { ReactNode } from 'react';

export type ProxiedImageProps = Omit<FastImageProps, 'source'> & {
  proxyOptions: string;
  source: Source;
};

export type ScaledImageProps = ProxiedImageProps & {
  desiredWidth?: number;
  desiredHeight?: number;
  proxyOptions: string;
};

export type ContentTileFullWidthProps = {
  title: ReactNode;
  secondText: ReactNode;
  thirdText?: ReactNode;
  imageUri?: string;
  imageProxyOptions?: string;
  imageDesiredWidth?: number;
  imageDesiredHeight?: number;
  imageFetchPriority?: Priority;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
};

export type ActionButton = {
  title: ReactNode;
  icon: JSX.Element;
  routeName?: keyof ProfileStackParamList;
};

export type ActionButtonProps = PressableProps & ActionButton;

export type PrivateCollectionButton = PressableProps & {
  userOwnsIssueInitialValue: boolean;
  issueCode: string;
};
