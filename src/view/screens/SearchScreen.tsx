import React, { useState } from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';
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

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

export default function({ navigation }: Props) {
  const { status, data, error, isFetching } = useIssues();
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  function onPress(issue: Issue) {
    navigation.navigate('IssueDetail', {
      issue: {
        issueCode: issue.issuecode,
        title: issue.title,
      },
    });
  }

  function _renderItem({ item }: { item: Issue }) {
    return (
      <ContentTileFullWidth
        title={item.title}
        secondText={item.filledoldestdate}
        imageUri={item.image_urls[0]}
        imageDesiredWidth={100}
        imageProxyOptions={'200x'}
        onPress={() => onPress(item)}
      />
    );
  }

  function render() {
    if (isFetching) {
      return <Text style={text.h3}>{t('loading')}</Text>;
    }

    if (status === 'error') {
      return <Text style={text.h3}>Error {error.message}</Text>;
    }

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <Separator style={{ marginHorizontal: 8 }} />
        <FlatList
          // data={data!.filter(issue => issue.title.includes(searchTerm))}
          data={data}
          renderItem={_renderItem}
          ItemSeparatorComponent={Separator}
          scrollEnabled={true}
        />
      </View>
    );
  }

  return render();
}
