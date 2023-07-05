import React, { StyleSheet, View, ViewStyle } from 'react-native';
import colors from '../../styles/Colors';

export default function(props: {
  width?: React.DimensionValue;
  margin?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={[
          props.style,
          {
            borderColor: colors.grey,
            width: props.width ?? props.style?.width ?? '100%',
            margin: props.margin ?? props.style?.margin,
            borderBottomWidth: StyleSheet.hairlineWidth,
          },
        ]}
      />
    </View>
  );
}
