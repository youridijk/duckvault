import useEquivalents from '../../queryHooks/GetEquivalents';
import { useNavigation } from '@react-navigation/native';
import { IssueDetailScreenProps } from '../../types/Navigation';
import { useTranslation } from 'react-i18next';
import { Equivalent } from '../../types/db/Custom';
import ContentTileFullWidth from '../tiles/ContentTileFullWidth';
import LoadingScreen from '../data-fetching/LoadingScreen';
import ErrorScreen from '../data-fetching/ErrorScreen';
import { FlatList } from 'react-native';
import Separator from '../generic/Separator';
import React from 'react';

export default function({ issueCode }: { issueCode: string }) {
  const { error, data, status } = useEquivalents(issueCode);
  const navigation = useNavigation<IssueDetailScreenProps['navigation']>();
  const { t } = useTranslation();

  function onPress(equivalent: Equivalent) {
    navigation.push('IssueDetail', {
      issue: {
        issueCode: equivalent.issue.issuecode,
        title: equivalent.issue.title,
      },
    });
  }

  function _renderItem({ item }: { item: Equivalent }) {
    return (
      <ContentTileFullWidth
        onPress={() => onPress(item)}
        title={item.issue.publication.title + ' ' + item.issue.issuenumber}
        secondText={item.issue.title}
        thirdText={t('countryNames.' + item.issue.publication.country.countryname) as string}
        imageUri={item.issue.entry[0]?.full_entryurl[0]?.fullurl}
        imageDesiredWidth={100}
      />
    );
  }

  function _render() {
    if (status === 'loading') {
      return <LoadingScreen />;
    }

    if (status === 'error') {
      return <ErrorScreen error={error} />;
    }

    return (
      <FlatList
        data={data!}
        renderItem={_renderItem}
        ItemSeparatorComponent={Separator}
        scrollEnabled={false}
      />
    );
  }

  return _render();
}
