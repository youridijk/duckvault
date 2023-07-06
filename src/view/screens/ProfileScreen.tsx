import { H2, H3, H4 } from '../../components/generic/Headings';
import useAuth from '../../state/auth/useAuth';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import If from '../../components/generic/basics/If';
import ScaledImage from '../../components/generic/images/ScaledImage';
import ActionButtons from '../../components/profile/ActionButtons';
import { usePrivateCollection } from '../../queryHooks/GetPrivateCollection';
import { PrivateCollectionIssue } from '../../types/db/Backend';
import IssueImageAlternative from '../../components/tiles/IssueImageAlternative';

const styleSheet = StyleSheet.create({
  safeAreaView: {
    margin: 8,
  },
  usernameText: {
    textAlign: 'center',
    marginTop: 10,
  },
  followersFollowingView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  followersFollowingSubView: {
    alignItems: 'center',
    marginTop: 10,
  },
  followersFollowingSubViewSpacer: {
    flex: 1,
  },
  privateCollectionView: {
    marginTop: 20,
  },
  privateCollectionList: {
    marginTop: 10,
  },
  privateCollectionListSeparator: {
    width: 5,
  },
});

export default function() {
  const { user, authHeaders } = useAuth();
  const { t } = useTranslation();
  const { status, data } = usePrivateCollection(authHeaders, 10);

  function _renderItem({ item }: { item: PrivateCollectionIssue }) {
    const height = 180;
    if (item?.issue?.images?.length) {
      return (
        <ScaledImage
          desiredHeight={height}
          source={{ uri: item.issue?.images[0].fullurl }}
          proxyOptions={'200x'}
          resizeMode="contain"
        />
      );
    } else {
      return <IssueImageAlternative height={height} aspectRatio={0.7} issue={item.issue} />;
    }
  }

  function _render() {
    return (
      <SafeAreaView style={styleSheet.safeAreaView}>
        <H2 style={styleSheet.usernameText}>{user?.username}</H2>

        <View style={styleSheet.followersFollowingView}>
          <View style={styleSheet.followersFollowingSubViewSpacer} />
          <View style={styleSheet.followersFollowingSubView}>
            <H3>{user?.followers ?? 0}</H3>
            <H4>{t('profile.followers')}</H4>
          </View>
          <View style={styleSheet.followersFollowingSubViewSpacer} />
          <View style={styleSheet.followersFollowingSubView}>
            <H3>{user?.following ?? 0}</H3>
            <H4>{t('profile.following')}</H4>
          </View>
          <View style={styleSheet.followersFollowingSubViewSpacer} />
        </View>

        <If statement={status === 'loading'}>
          <ActivityIndicator size="large" />
        </If>

        <If statement={status === 'success'}>
          <View style={styleSheet.privateCollectionView}>
            <H3>{t('profile.privateCollection')}</H3>
            <FlatList
              data={data?.pages[0]}
              renderItem={_renderItem}
              keyExtractor={item => item.issue_code}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={((data?.pages[0].length ?? 0) > 2)}
              style={styleSheet.privateCollectionList}
              ItemSeparatorComponent={() => <View style={styleSheet.privateCollectionListSeparator} />}
            />
          </View>
        </If>

        <ActionButtons />
      </SafeAreaView>
    );
  }

  return _render();
}
