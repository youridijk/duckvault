import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { IssueDetailScreenProps } from '../../types/Navigation';
import useIssue from '../../queryHooks/GetIssue';
import LoadingScreen from '../../components/data-fetching/LoadingScreen';
import ErrorScreen from '../../components/data-fetching/ErrorScreen';
import ScaledImage from '../../components/generic/images/ScaledImage';
import P from '../../components/generic/P';
import { H2, H4 } from '../../components/generic/Headings';
import { useTranslation } from 'react-i18next';
import { TabScreen, TabView } from '../../components/generic/TabView';
import colors from '../../styles/Colors';
import useAuth from '../../state/auth/useAuth';
import If from '../../components/generic/basics/If';
import EquivalentsList from '../../components/issuedetail/EquivalentsList';
import EntriesList from '../../components/issuedetail/EntriesList';
import Buttons from '../../components/issuedetail/Buttons';

const styleSheet = StyleSheet.create({
  scrollViewContentContainer: {
    padding: 10,
    gap: 10,
  },
  issueDataWrapperView: {
    flexDirection: 'row',
    columnGap: 10,
  },
  issueDataView: {
    flexShrink: 1,
    rowGap: 10,
  },
});

export default function({ route, navigation }: IssueDetailScreenProps) {
  const issue = route.params.issue;
  const { authHeaders } = useAuth();
  const { status, data, error } = useIssue(issue.issueCode, authHeaders);
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: issue.title,
    });
  }, [navigation, issue]);

  function _render() {
    if (status === 'loading') {
      return <LoadingScreen />;
    }

    if (status === 'error') {
      return <ErrorScreen error={error} />;
    }

    return (
      <ScrollView
        contentContainerStyle={styleSheet.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styleSheet.issueDataWrapperView}
        >
          {data!.image_urls[0] ?
            <ScaledImage
              source={{ uri: data!.image_urls[0].fullurl, priority: 'high' }}
              desiredWidth={150}
              proxyOptions={'200x'}
              resizeMode={'cover'} />
            : null}
          <View style={styleSheet.issueDataView}>
            <H2>{data!.title}</H2>
            <H4>{data!.publication?.title + ' ' + data!.issuenumber}</H4>
            <P>{data!.oldestdate}</P>
          </View>
        </View>

        <If statement={data?.userOwnsIssue != null}>
          <Buttons issueCode={issue.issueCode} userOwnsIssueInitialValue={data!.userOwnsIssue!} />
        </If>

        <TabView backgroundColor={colors.black} activeBackgroundColor={colors.primary}>
          {
            data!.entry.length ?
              <TabScreen title={t('navigation.stories')}>
                <EntriesList entries={data!.entry} />
              </TabScreen>
              : null
          }
          {data!.equiv_count.length ?
            <TabScreen title={t('navigation.equivalents')}>
              <EquivalentsList issueCode={issue.issueCode} />
            </TabScreen>
            : null
          }
        </TabView>
      </ScrollView>
    );
  }


  return _render();
}
