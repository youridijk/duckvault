import { usePrivateCollection } from '../../queryHooks/GetPrivateCollection';
import useAuth from '../../state/auth/useAuth';
import { PrivateCollectionIssue } from '../../types/db/Backend';
import ContentTileFullWidth from '../../components/tiles/ContentTileFullWidth';
import { ActivityIndicator, FlatList, View } from 'react-native';
import LoadingScreen from '../../components/data-fetching/LoadingScreen';
import ErrorScreen from '../../components/data-fetching/ErrorScreen';
import Separator from '../../components/generic/Separator';
import If from '../../components/generic/basics/If';

export default function() {
  const { authHeaders } = useAuth();
  const { status, data, error, fetchNextPage, isFetchingNextPage } = usePrivateCollection(authHeaders, 10);

  function _renderItem({ item }: { item: PrivateCollectionIssue }) {
    return <ContentTileFullWidth
      title={item.issue.title}
      secondText={new Date(item.issue.oldestdate).toDateString()}
      imageDesiredWidth={100}
      imageUri={item.issue?.images?.[0]?.fullurl}
    />;
  }

  function _render() {
    if (status === 'loading') {
      return <LoadingScreen />;
    }

    if (status === 'error') {
      return <ErrorScreen error={error} />;
    }

    return (
      <View>
        <FlatList
          data={data?.pages?.flat()}
          renderItem={_renderItem}
          keyExtractor={item => item.issue_code}
          ItemSeparatorComponent={() => <Separator width={'96%'} />}
          onEndReached={() => fetchNextPage()}
          style={{height: '100%'}}
        />
        <If statement={isFetchingNextPage}>
          <ActivityIndicator size={'large'} />
        </If>
      </View>
    );
  }

  return _render();
}
