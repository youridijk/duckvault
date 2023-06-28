import { useState } from 'react';
import ProxiedImage from './ProxiedImage';
import { ScaledImageProps } from '../../../types/types';

// credits to https://stackoverflow.com/a/51897371/8882270
export default function(props: ScaledImageProps) {
  const uri = props.source.uri!;

  // 1.3 is based on story image from a pocket. The 1.3 is to prevent glitching
  const [desiredHeight, setDesiredHeight] = useState(
    // props.desiredHeight ?? (props.desiredWidth ?? 0) * 1.1,
    0,
  );
  const [desiredWidth, setDesiredWidth] = useState(
    props.desiredWidth ?? (props.desiredHeight ?? 0) / 1.3,
  );

  return (
    <ProxiedImage
      {...props}
      onLoad={({ nativeEvent: { width, height } }) => {
        console.log('load ', uri);

        // console.log(props.desiredWidth);
        if (props.desiredWidth) {
          const calculatedHeight = (desiredWidth / width) * height;
          setDesiredHeight(calculatedHeight);
        } else {
          const calculatedWidth = (desiredHeight / height) * width;
          setDesiredWidth(calculatedWidth);
        }
      }}
      style={[
        props.style,
        {
          width: desiredWidth,
          height: desiredHeight,
          display: desiredHeight === 0 ? 'none' : 'flex',
        }]}
    />
  );
}
