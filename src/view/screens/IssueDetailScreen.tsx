import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SearchStackParamList} from '../../types/navigation/SearchStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;
export default function ({route, navigation}: Props) {
  const issue = route.params.issue;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: issue.title,
    });
  }, [navigation, issue]);

  function render() {

    return (
      <View>
        <Text>{JSON.stringify(route.params.issue, null, 2)}</Text>
      </View>
    );
  }

  return render();
}
