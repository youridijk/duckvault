import { Image, ImageProps } from 'react-native';
import { useState } from 'react';
import Settings from '../Settings';
import { ImageURISource } from 'react-native/Libraries/Image/ImageSource';

type Props = ImageProps & {
  desiredWidth: number;
  proxyOptions: string;
  source: ImageURISource;
};

// credits to https://stackoverflow.com/a/51897371/8882270
export default function(props: Props) {
  const { desiredWidth, proxyOptions } = props;
  const [desiredHeight, setDesiredHeight] = useState(0);

  if (!props.source.uri) {
    throw Error('Uri needs to be provided');
  }

  const { uri } = props.source;
  const proxiedUri = `${Settings.imageProxyUrl}/${proxyOptions}/${uri}`;
  console.log(proxiedUri);

  Image.getSize(proxiedUri, (width, height) => {
    setDesiredHeight((desiredWidth / width) * height);
  });

  return (
    <Image
      {...props}
      source={{ uri: proxiedUri }}
      style={[
        props.style,
        {
          borderWidth: 1,
          width: desiredWidth,
          height: desiredHeight,
        }]}
    />
  );
}
