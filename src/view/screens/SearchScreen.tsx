import React, { useState } from 'react';
import { FlatList, Platform, Text, View } from 'react-native';
import Separator from '../../components/generic/Separator';
import Issue from '../../types/Issue';
import { useIssues } from '../../queryHooks/Issues';
import text from '../../styles/Text';
import { useTranslation } from 'react-i18next';
import SearchBar from '../../components/SearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../types/navigation/SearchStackParamList';
import colors from '../../styles/Colors';
import ContentTileFullWidth from '../../components/ContentTileFullWidth';

import useSearchIssues from '../../queryHooks/search/SearchIssues';
import MeilisearchIssue from '../../types/meilisearch/MeilisearchIssue';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

export default function({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const { status, data, error, isFetching } = useSearchIssues(searchQuery);


  function onPress(issue: MeilisearchIssue) {
    navigation.navigate('IssueDetail', {
      issue: {
        issueCode: issue.issuecode,
        title: issue.issue_title,
      },
    });
  }

  function _renderItem({ item }: { item: MeilisearchIssue }) {
    return (
      <>
        {
          item?.image_urls?.length ?
            <ContentTileFullWidth
              title={item.full_title}
              secondText={item.filledoldestdate}
              // imageUri={item.image_urls[0].fullurl}
              imageDesiredWidth={100}
              imageProxyOptions={'200x'}
              onPress={() => onPress(item)}
            />
            :
            <ContentTileFullWidth
              title={item.full_title}
              secondText={item.filledoldestdate}
              onPress={() => onPress(item)}
            />
        }
      </>
    );
  }

  function IssuesList() {
    if (isFetching) {
      return <LoadingScreen />;
    }

    if (status === 'error') {
      return <ErrorScreen error={error} />;
    }

    return (
      <FlatList
        data={data!.hits}
        renderItem={_renderItem}
        ItemSeparatorComponent={Separator}
        scrollEnabled={true}
      />
    );
  }

  function render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SearchBar setSearchTerm={setSearchQuery} searchTerm={searchQuery} />
        <Separator style={{ marginHorizontal: 8 }} />
        <IssuesList />
      </View>
    );
  }

  return render();
}


