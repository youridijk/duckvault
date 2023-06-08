import React from 'react';
import text from '../styles/Text';
import { Text, TouchableHighlight, TouchableWithoutFeedbackProps, View } from 'react-native';
import colors from '../styles/Colors';
import ScaledImage from './ScaledImage';

type Props = {
  title: string;
  secondText: string;
  thirdText?: string;
  imageUri?: string;
  imageProxyOptions?: string;
  imageDesiredWidth?: number;
  onPress?: TouchableWithoutFeedbackProps['onPress'];
};

export default function({ title, secondText, thirdText, imageUri, imageProxyOptions, imageDesiredWidth, onPress }: Props) {

  function _main() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 8,
          paddingVertical: 16,
          backgroundColor: colors.background,
        }}
      >
        {imageUri ?
          <ScaledImage
            style={{ width: 100, minHeight: 150 }}
            resizeMode={'contain'}
            source={{ uri: imageUri }}
            proxyOptions={imageProxyOptions ?? '200x'}
            desiredWidth={imageDesiredWidth ?? 200}
          /> : null
        }
        <View style={{ justifyContent: 'center', marginLeft: 12, flexShrink: 1, gap: 5}}>
          <Text style={text.h3}>{title}</Text>
          <Text style={text.normal}>{secondText}</Text>

          {thirdText ? <Text style={text.normal}>{thirdText}</Text> : null}
        </View>
      </View>
    );
  }

  if (onPress) {
    return (
      <TouchableHighlight onPress={onPress}>
        <_main />
      </TouchableHighlight>
    );
  }

  return <_main />;
}
