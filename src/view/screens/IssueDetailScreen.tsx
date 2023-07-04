import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SearchStackParamList } from '../../types/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useIssue from '../../queryHooks/GetIssue';
import LoadingScreen from '../../components/data-fetching/LoadingScreen';
import ErrorScreen from '../../components/data-fetching/ErrorScreen';
import ScaledImage from '../../components/generic/images/ScaledImage';
import P from '../../components/generic/P';
import { H2, H4 } from '../../components/generic/Headings';
import ContentTileFullWidth from '../../components/tiles/ContentTileFullWidth';
import { useTranslation } from 'react-i18next';
import Separator from '../../components/generic/Separator';
import { TabScreen, TabView } from '../../components/generic/TabView';
import colors from '../../styles/Colors';
import useEquivalents from '../../queryHooks/GetEquivalents';
import { useNavigation } from '@react-navigation/native';
import { EntryWithImages, Equivalent } from '../../types/db/Custom';
import ProxiedImage from '../../components/generic/images/ProxiedImage';


type Props = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;

export default function({ route, navigation }: Props) {
  const issue = route.params.issue;
  const { status, data, error, isFetching } = useIssue(issue.issueCode);
  const { t } = useTranslation();

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
          {data!.image_urls[0] ?
            <ScaledImage
              source={{ uri: data!.image_urls[0].fullurl, priority: 'high' }}
              // style={{
              //   width: 150,
              // height: 150 * 1.2,
              //   overflow: 'visible'
              //               }}

              desiredWidth={150}
              proxyOptions={'200x'}
              resizeMode={'cover'} />
            : null}
          <View style={{ flexShrink: 1, gap: 10 }}>
            <H2>{data!.title}</H2>
            <H4>{data!.publication?.title + ' ' + data!.issuenumber}</H4>
            <P>{data!.oldestdate}</P>
          </View>
        </View>

        <TabView backgroundColor={colors.black} activeBackgroundColor={colors.primary}>
          {
            data!.entry.length ?
              <TabScreen title={t('navigation.stories')}>
                <FlatList
                  data={data!.entry.slice(0, 100)}
                  renderItem={_renderItem}
                  ItemSeparatorComponent={Separator}
                  scrollEnabled={false}
                />
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

  function _renderItem({ index, item }: { index: number, item: EntryWithImages }) {
    return (
      <ContentTileFullWidth
        title={item?.title ?? item?.storyversion?.story?.title}
        secondText={item.storyversion?.story?.firstpublicationdate}
        thirdText={item.storyversion?.storydescription[0]?.desctext}
        imageUri={item?.original_entry_urls?.[0]?.fullurl ?? item?.story_entry_urls?.[0]?.fullurl}
        imageDesiredWidth={100}
        imageProxyOptions={'200x'}
        imageFetchPriority={index < 3 ? 'high' : 'low'}
        // imageProxyOptions={'200x'}
        // imageDesiredHeight={150}
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
