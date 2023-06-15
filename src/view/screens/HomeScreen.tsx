import React, {useContext} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import ViewStyle from '../../styles/ViewStyle';
import {IssuesContext} from '../../state/IssuesContext';
import IssueTile from '../../components/tiles/IssueTile';
import text from '../../styles/Text';
import {useTranslation} from 'react-i18next';

export default function () {
  const [issuesList] = useContext(IssuesContext);
  const {t} = useTranslation();

  return (
    <View style={[ViewStyle.default, {flex: 1}]}>
      <Text style={[text.h2, {margin: 6}]}>{t('tappedIssues')}</Text>
      <FlatList
        style={{flexGrow: 0, width: '100%'}}
        data={[...issuesList]}
        renderItem={({item}) => <IssueTile issue={item} />}
        keyExtractor={item => item.issuecode}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
