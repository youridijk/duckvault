import React from 'react';
import text from '../../styles/Text';
import { Text, TouchableHighlight, View } from 'react-native';
import colors from '../../styles/Colors';
import ScaledImage from '../generic/images/ScaledImage';
import { ContentTileFullWidthProps } from '../../types/types';
import If from '../generic/basics/If';
import ProxiedImage from '../generic/images/ProxiedImage';

export default function({
  title,
  secondText,
  thirdText,
  imageUri,
  imageProxyOptions,
  onPress,
  imageDesiredWidth,
  imageDesiredHeight,
  imageFetchPriority,
}: ContentTileFullWidthProps) {
  if (imageUri && !imageDesiredWidth && !imageDesiredHeight) {
    throw Error('imageDesiredWidth or imageDesiredHeight must be defined when image uri is provided');
  }

  function _main() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 8,
          paddingVertical: 16,
          backgroundColor: colors.background,
          flex: 1,
          flexGrow: 1,
          gap: 10,
        }}
      >

        <View style={{ justifyContent: 'center', flexShrink: 1, gap: 5, flex: 1 }}>
          <Text style={text.h3}>{title}</Text>
          <Text style={text.normal}>{secondText}</Text>

          <If statement={!!thirdText}>
            <Text style={text.normal}>{thirdText}</Text>
          </If>
        </View>
        <If statement={!!imageUri}>
          <ProxiedImage
            resizeMode={'contain'}
            source={{ uri: imageUri, priority: imageFetchPriority }}
            proxyOptions={imageProxyOptions ?? '200x'}
            style={{
              width: imageDesiredWidth,
              height: imageDesiredWidth! * 1.5,
            }}
            // desiredWidth={imageDesiredWidth}
            // desiredHeight={imageDesiredHeight}
          />
        </If>
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
