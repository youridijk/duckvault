import { FlatList, Pressable, PressableProps, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { SearchStackParamList } from '../../types/navigation/SearchStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useIssue from '../../queryHooks/GetIssue';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import Settings from '../../Settings';
import ScaledImage from '../../components/ScaledImage';
import P from '../../components/generic/P';
import { H2, H4 } from '../../components/generic/Headings';
import colors from '../../styles/Colors';
import Separator from '../../components/generic/Separator';
import Issue from '../../types/Issue';
import ContentTileFullWidth from '../../components/ContentTileFullWidth';
import IssueWithEntries from '../../types/IssueWithEntries';

const style = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    flex: 1,
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});

type Props = NativeStackScreenProps<SearchStackParamList, 'IssueDetail'>;

export default function({ route, navigation }: Props) {
  const issue = route.params.issue;
  const { status, data, error, isFetching } = useIssue(issue.issueCode);

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


    const imageUrl = `${Settings.imageProxyUrl}/300x/${data!.image_urls[0]}`;
    return (
      <ScrollView style={{ margin: 10, flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <ScaledImage uri={imageUrl} desiredWidth={150} />
          <View style={{ flexShrink: 1, gap: 10 }}>
            <H2>{data!.title}</H2>
            <H4>{data!.publication.title}</H4>
            <P>{data!.filledoldestdate}</P>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.black,
            marginVertical: 10,
          }}>
          <Pressable style={[style.button]}>
            <Text style={style.buttonText}>Stories</Text>
          </Pressable>
        </View>
        <FlatList
          data={data!.entry}
          renderItem={_renderItem}
          ItemSeparatorComponent={Separator}
          scrollEnabled={false}
        />
      </ScrollView>
    );
  }

  function _renderItem({ item }: { item: IssueWithEntries['entry'][0] }) {
    return (
      // <TouchableHighlight onPress={() => onPress(item)}>
      <ContentTileFullWidth
        title={item.title}
        secondText={item.storyversion.story.firstpublicationdate}
        thirdText={item.storyversion.storydescription[0]?.desctext}
      />
      // </TouchableHighlight>
    );
  }

  return render();
}



