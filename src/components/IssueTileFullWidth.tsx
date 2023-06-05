import Issue from '../types/Issue';
import React from 'react';
import Settings from '../Settings';
import text from '../styles/Text';
import {Image, Text, View} from 'react-native';
import colors from '../styles/Colors';

export default function ({issue}: {issue: Issue}) {
  const imageUrl = `${Settings.imageProxyUrl}/200x/${issue.image_urls}`;

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: colors.background,
      }}>
      <Image
        style={{width: 100, minHeight: 150}}
        resizeMode={'contain'}
        source={{uri: imageUrl}}
      />
      <View style={{justifyContent: 'center', marginLeft: 12}}>
        <Text style={text.h3}>{issue.title}</Text>
        <Text key={issue.issuecode} style={[text.h4]}>
          {issue.filledoldestdate}
        </Text>
      </View>
    </View>
  );
}
