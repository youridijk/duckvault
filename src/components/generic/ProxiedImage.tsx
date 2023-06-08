import { Image, ImageProps } from 'react-native';
import Settings from '../../Settings';
import { ImageURISource } from 'react-native/Libraries/Image/ImageSource';

type Props = ImageProps & { proxyOptions: string; source: ImageURISource };

export default function(props: Props) {
  const { source, proxyOptions } = props;
  const proxiedUri = `${Settings.imageProxyUrl}/${proxyOptions}/${source.uri}`;
  return <Image {...props} source={{ uri: proxiedUri }} />;
}
