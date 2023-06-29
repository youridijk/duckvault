import Settings from '../../../Settings';
import FastImage from 'react-native-fast-image';
import { ProxiedImageProps } from '../../../types/types';


export default function(props: ProxiedImageProps) {
  const { source, source: {uri}, proxyOptions } = props;
  if (!uri) {
    throw Error('Uri needs to be provided');
  }

  const proxiedUri = `${Settings.imageProxyUrl}/${proxyOptions}/${uri}&normalsize=1`;
  return <FastImage {...props} source={{ ...source, uri: proxiedUri }} />;
}
