import {Image} from 'react-native';
import {useState} from 'react';

// credits to https://stackoverflow.com/a/51897371/8882270
export default function ({
  uri,
  desiredWidth,
}: {
  uri: string;
  desiredWidth: number;
}) {
  const [desiredHeight, setDesiredHeight] = useState(0);

  Image.getSize(uri, (width, height) => {
    setDesiredHeight((desiredWidth / width) * height);
  });

  return (
    <Image
      source={{uri}}
      style={{
        borderWidth: 1,
        width: desiredWidth,
        height: desiredHeight,
      }}
    />
  );
}
