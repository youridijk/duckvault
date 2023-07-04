import React, { StyleSheet, View, ViewStyle } from 'react-native';
import colors from '../../styles/Colors';

export default function (props: {
  margin?: number;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        props.style,
        {
          borderColor: colors.grey,
          margin: props.margin,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    />
  );
}
