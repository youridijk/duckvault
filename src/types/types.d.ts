import { FastImageProps } from 'react-native-fast-image';
import { ImageURISource } from 'react-native/Libraries/Image/ImageSource';
import { TouchableWithoutFeedbackProps } from 'react-native';

export type ProxiedImageProps = FastImageProps & {
  proxyOptions: string;
  source: ImageURISource;
};

export type ScaledImageProps = ProxiedImageProps & {
  desiredWidth?: number;
  desiredHeight?: number;
  proxyOptions: string;
  source: ImageURISource;
};

export type ContentTileFullWidthProps = {
  title: string;
  secondText: string;
  thirdText?: string;
  imageUri?: string;
  imageProxyOptions?: string;
  imageDesiredWidth?: number;
  imageDesiredHeight?: number;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
};
