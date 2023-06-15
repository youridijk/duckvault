import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Separator from '../../components/generic/Separator';
import SearchBar from '../../components/searchscreen/SearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../types/navigation/SearchStackParamList';
import colors from '../../styles/Colors';
import ContentTileFullWidth from '../../components/tiles/ContentTileFullWidth';

import { searchWithLibrary } from '../../queryHooks/search/SearchIssues';
import MeilisearchIssue from '../../types/meilisearch/MeilisearchIssue';
import ErrorScreen from '../../components/data-fetching/ErrorScreen';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

export default function({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  // const { status, data, error, isFetching } = useSearchIssues(searchQuery);
  const [results, setResults] = useState<MeilisearchIssue[]>([]);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    searchWithLibrary(searchQuery, i18n.resolvedLanguage)
      .then((search) => {
        setResults(search.hits);
      })
      .catch(setError);
  }, [searchQuery]);

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
              // disable images as this causes to many requests to Inducks
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
    if (error) {
      return <ErrorScreen error={error} />;
    }

    return (
      <FlatList
        data={results}
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


