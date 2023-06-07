import React from 'react';
import Settings from '../Settings';
import text from '../styles/Text';
import { Image, Text, View } from 'react-native';
import colors from '../styles/Colors';

type Props = {
  title: string;
  secondText: string;
  thirdText?: string;
  imageUrl?: string;
};

export default function({ title, secondText, thirdText, imageUrl }: Props) {


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
      {imageUrl ?
        <Image
          style={{ width: 100, minHeight: 150 }}
          resizeMode={'contain'}
          source={{ uri: `${Settings.imageProxyUrl}/200x/${imageUrl}`}}
        /> : null
      }
      <View style={{ justifyContent: 'center', marginLeft: 12 }}>
        <Text style={text.h3}>{title}</Text>
        <Text style={[text.normal]}>{secondText}</Text>

        {thirdText ? <Text style={[text.normal]}>{thirdText}</Text> : null}
      </View>
    </View>
  );
}
