import { H2, H3, H4 } from '../../components/generic/Headings';
import useAuth from '../../state/auth/useAuth';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import If from '../../components/generic/basics/If';
import ScaledImage from '../../components/generic/images/ScaledImage';
import ActionButtons from '../../components/profile/ActionButtons';
import { usePrivateCollection } from '../../queryHooks/GetPrivateCollection';
import { PrivateCollectionIssue } from '../../types/db/Backend';
import IssueImageAlternative from '../../components/tiles/IssueImageAlternative';
import { ProfileScreenProps } from '../../types/Navigation';

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
  logoutButton: {
    color: 'red',
    fontWeight: 'normal',
    textAlign: 'center',
  },
});

export default function({ navigation }: ProfileScreenProps) {
  const { user, authHeaders, logout } = useAuth();
  const { t } = useTranslation();
  const { status, data } = usePrivateCollection(authHeaders, 12);

  function _onFlatListItemPressed({ issue }: PrivateCollectionIssue) {
    navigation.navigate('IssueDetail', {
      issue: {
        issueCode: issue.issuecode,
        title: issue.title ?? issue.publication.title + ' ' + issue.issuenumber,
      },
    });
  }

  function _renderItem({ item }: { item: PrivateCollectionIssue }) {
    const height = 180;
    if (item?.issue?.images?.length) {
      return (
        <Pressable>
          <ScaledImage
            desiredHeight={height}
            source={{ uri: item.issue?.images[0].fullurl }}
            proxyOptions={'200x'}
            resizeMode="contain"
          />
        </Pressable>
      );
    } else {
      return (
        <Pressable onPress={() => _onFlatListItemPressed(item)}>
          <IssueImageAlternative height={height} aspectRatio={0.7} issue={item.issue} />
        </Pressable>
      );
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
        <View style={{ height: 40 }} />

        <Pressable onPress={logout}>
          <H3 style={styleSheet.logoutButton}>{t('profile.logout')}</H3>
        </Pressable>
      </SafeAreaView>
    );
  }

  return _render();
}
