import { Image } from 'react-native';
import { useState } from 'react';
import Settings from '../Settings';

type Props = {
  uri: string;
  desiredWidth: number;
  imageProxyOptions: string;
};

// credits to https://stackoverflow.com/a/51897371/8882270
export default function({ uri, desiredWidth, imageProxyOptions }: Props) {
  const [desiredHeight, setDesiredHeight] = useState(0);

  Image.getSize(uri, (width, height) => {
    setDesiredHeight((desiredWidth / width) * height);
  });

  const proxiedUri = `${Settings.imageProxyUrl}/${imageProxyOptions}/${uri}`;

  return (
    <Image
      source={{ uri: proxiedUri }}
      style={{
        borderWidth: 1,
        width: desiredWidth,
        height: desiredHeight,
      }}
    />
  );
}
