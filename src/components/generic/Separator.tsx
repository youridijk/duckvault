import React, {View} from 'react-native';

export default function (props: {
  height?: number;
  margin?: number;
  style?: any;
}) {
  return (
    <View
      style={[
        {
          height: props.height ?? 0.5,
          backgroundColor: 'grey',
          margin: props.margin,
        },
        props.style,
      ]}
    />
  );
}
