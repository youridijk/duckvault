import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SearchStackParamList } from '../../types/navigation/SearchStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useIssue from '../../queryHooks/GetIssue';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import ScaledImage from '../../components/ScaledImage';
import P from '../../components/generic/P';
import { H2, H4 } from '../../components/generic/Headings';
import ContentTileFullWidth from '../../components/ContentTileFullWidth';
import IssueWithEntries from '../../types/IssueWithEntries';
import { useTranslation } from 'react-i18next';
import Separator from '../../components/generic/Separator';
import { TabScreen, TabView } from '../../components/TabView';
import colors from '../../styles/Colors';
import useEquivalents from '../../queryHooks/GetEquivalents';
import Equivalent from '../../types/Equivalent';
import { useNavigation } from '@react-navigation/native';


type Props = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;

export default function({ route, navigation }: Props) {
  const issue = route.params.issue;
  const { status, data, error, isFetching } = useIssue(issue.issueCode);
  // const { t } = useTranslation();

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

    return (
      <ScrollView
        contentContainerStyle={{ padding: 10, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          {data!.image_urls[0] ? <ScaledImage source={{ uri: data!.image_urls[0] }} desiredWidth={150} proxyOptions={'200x'} /> : null}
          <View style={{ flexShrink: 1, gap: 10 }}>
            <H2>{data!.title}</H2>
            <H4>{data!.publication.title + ' ' + data!.issuenumber}</H4>
            <P>{data!.filledoldestdate}</P>
          </View>
        </View>

        <TabView backgroundColor={colors.black} activeBackgroundColor={colors.primary}>
          <TabScreen title={'Issues'}>
            <FlatList
              data={data!.entry}
              renderItem={_renderItem}
              ItemSeparatorComponent={Separator}
              scrollEnabled={false}
            />
          </TabScreen>
          {data!.equiv_count.length ?
            <TabScreen title={'Equivalents'}>
              <EquivalentsList issueCode={issue.issueCode} />
            </TabScreen>
            : null
          }
        </TabView>
        {/*<MYTabs/>*/}
      </ScrollView>
    );
  }

  function _renderItem({ item }: { item: IssueWithEntries['entry'][0] }) {
    return (
      <ContentTileFullWidth
        title={item.title}
        secondText={item.storyversion.story.firstpublicationdate}
        thirdText={item.storyversion.storydescription[0]?.desctext}
      />
    );
  }

  return render();
}

function EquivalentsList(props: { issueCode: string }) {
  const { issueCode } = props;
  const { error, data, status } = useEquivalents(issueCode);
  const navigation = useNavigation<Props['navigation']>();
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

  function render() {
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

  return render();
}
