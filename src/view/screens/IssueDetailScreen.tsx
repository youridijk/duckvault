import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SearchStackParamList} from '../../types/navigation/SearchStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useIssue from '../../queryHooks/GetIssue';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import Settings from '../../Settings';
import ScaledImage from '../../components/ScaledImage';

type Props = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;
export default function ({route, navigation}: Props) {
  const issue = route.params.issue;
  const {status, data, error, isFetching} = useIssue(issue.issueCode);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: issue.title,
    });
  }, [navigation, issue]);

  function render() {
    if (isFetching) {
      return <LoadingScreen />;
    }

    if (status === 'error') {
      return <ErrorScreen error={error} />;
    }

    const imageUrl = `${Settings.imageProxyUrl}/200x/https://inducks.org/hr.php?image=https://outducks.org/webusers/webusers/2023/02/nl_po3_335a_001.jpg`;
    console.log(imageUrl);
    return (
      <View>
        <View
          style={{
            display: 'flex',
          }}>
          <ScaledImage uri={imageUrl} desiredWidth={200} />
          <Text>TEST</Text>
        </View>
      </View>
    );
  }

  return render();
}
