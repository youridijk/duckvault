import { FastImageProps, Priority, Source } from 'react-native-fast-image';
import { PressableProps, TouchableWithoutFeedbackProps } from 'react-native';
import { ProfileStackParamList } from './Navigation';

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
  title: string;
  secondText: string;
  thirdText?: string;
  imageUri?: string;
  imageProxyOptions?: string;
  imageDesiredWidth?: number;
  imageDesiredHeight?: number;
  imageFetchPriority?: Priority;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
};

export type ActionButton = {
  title: string;
  icon: JSX.Element;
  routeName?: keyof ProfileStackParamList;
};

export type ActionButtonProps = PressableProps & ActionButton;
