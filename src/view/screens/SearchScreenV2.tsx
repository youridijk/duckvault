import settings from '../../Settings';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from '../../types/navigation/SearchStackParamList';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import MeilisearchIssue from '../../types/meilisearch/MeilisearchIssue';
import { InstantSearch, connectSearchBox, connectInfiniteHits, Configure } from 'react-instantsearch-native';
import { FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import 'react-native-url-polyfill/auto';
import colors from '../../styles/Colors';
import { useTranslation } from 'react-i18next';
import ContentTileFullWidth from '../../components/ContentTileFullWidth';
import Separator from '../../components/generic/Separator';


type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;
export default function(props: Props) {
  const { i18n } = useTranslation();
  const searchClient = instantMeiliSearch(
    settings.meilisearchUrl,
    process.env.MEILISEARCH_SEARCH_KEY
  );

  const [searchQuery, setSearchQuery] = useState('');

  // https://github.com/algolia/react-instantsearch/issues/1123
  return (
    <InstantSearch
      indexName="issues" searchClient={searchClient}
      onSearchStateChange={searchState => {
        console.log(searchState.query);
        // setSearchQuery(searchState.query ?? '');
      }}
    >
      <CustomSearchBox />
      <CustomInfiniteHits />
      {searchQuery === '' ?
        // filledoldestdate != 9999-12-31',
        <Configure filters={'languagecode = ' + i18n.resolvedLanguage} />
        :
        <>
          <Configure filters={'issuerangecode IS NULL'} sortBy={'filledoldestdate:desc'}  sort={'filledoldestdate:desc'}  />
          <Configure filters={' languagecode = nl'} sortBy={'filledoldestdate:desc'}  />
        </>
      }

      <Configure sortBy={'filledoldestdate:desc'} />
    </InstantSearch>
  );
}


const SearchBox = ({ refine, currentRefinement }: { refine: any; currentRefinement: any }) => {
  const { t } = useTranslation();

  return (
    <TextInput
      style={{
        fontSize: 17,
        padding: 12,
        backgroundColor: colors.white,
      }}
      onChangeText={value => refine(value)}
      value={currentRefinement}
      placeholder={t('search.searchBarText') as string}
      placeholderTextColor="grey"
      autoCorrect={false} />
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

const InfiniteHits = ({ hits }: { hits: MeilisearchIssue[] }) => {
  return (
    <FlatList
      data={hits}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <ContentTileFullWidth
          title={item.full_title}
          secondText={item.filledoldestdate}
        />
      )}
    />
  );
};

const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);
