import { FastImageProps, Priority, Source } from 'react-native-fast-image';
import { ImageURISource } from 'react-native/Libraries/Image/ImageSource';
import { TouchableWithoutFeedbackProps } from 'react-native';

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
