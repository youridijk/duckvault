import Settings from '../../../Settings';
import { ImageURISource } from 'react-native/Libraries/Image/ImageSource';
import FastImage from 'react-native-fast-image';
import { ProxiedImageProps } from '../../../types/types';


export default function(props: ProxiedImageProps) {
  if (!props.source.uri) {
    throw Error('Uri needs to be provided');
  }

  const { source, proxyOptions } = props;
  const proxiedUri = `${Settings.imageProxyUrl}/${proxyOptions}/${source.uri}&normalsize=1`;
  return <FastImage {...props} source={{ uri: proxiedUri }} />;
}
