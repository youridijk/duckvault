import {Text, View} from 'react-native';
import React from 'react';
import {SearchStackParamList} from '../../types/navigation/SearchStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;
export default function ({route}: Props) {
  return (
    <View>
      <Text>{JSON.stringify(route.params.issueCode, null, 2)}</Text>
    </View>
  );
}
