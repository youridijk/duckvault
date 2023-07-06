import { usePrivateCollection } from '../../queryHooks/GetPrivateCollection';
import useAuth from '../../state/auth/useAuth';
import { PrivateCollectionIssue } from '../../types/db/Backend';
import ContentTileFullWidth from '../../components/tiles/ContentTileFullWidth';
import { ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, View } from 'react-native';
import LoadingScreen from '../../components/data-fetching/LoadingScreen';
import ErrorScreen from '../../components/data-fetching/ErrorScreen';
import Separator from '../../components/generic/Separator';
import If from '../../components/generic/basics/If';
import { useEffect, useState } from 'react';
import IssueImageAlternative from '../../components/tiles/IssueImageAlternative';
import ScaledImage from '../../components/generic/images/ScaledImage';
import { PrivateCollectionScreenProps } from '../../types/Navigation';
import { ListBulletIcon } from 'react-native-heroicons/solid';
import colors from '../../styles/Colors';
import { Squares2X2Icon } from 'react-native-heroicons/outline';
import { useTranslation } from 'react-i18next';
import FormattedData from '../../components/generic/FormattedData';

type FlatListItemVariables = {
  item: PrivateCollectionIssue;
};

const styleSheet = StyleSheet.create({
  gridItemView: {
    justifyContent: 'center',
    margin: 2,
  },
  flatListGrid: {
    height: '100%',
    // margin: 5,
    marginBottom: 20,
  },
  flatListList: {
    height: '100%',
  },
});

export default function({ navigation }: PrivateCollectionScreenProps) {
  const { authHeaders } = useAuth();
  const [showGrid, setShowGrid] = useState(false);
  const { status, data, error, fetchNextPage, isFetchingNextPage } = usePrivateCollection(authHeaders, showGrid ? 12 : 10);
  const {i18n} = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: SwitchModeButton,
    });
  }, [navigation, showGrid]);

  function SwitchModeButton() {
    return (
      <Pressable onPress={() => setShowGrid(currentState => !currentState)}>
        {showGrid ?
          <ListBulletIcon fill={colors.white} color={colors.white} />
          :
          <Squares2X2Icon color={colors.white} />
        }
      </Pressable>
    );
  }

  function _renderListItem({ item }: FlatListItemVariables) {
    return <ContentTileFullWidth
      title={item.issue.title}
      secondText={<FormattedData date={item.issue.filledoldestdate}/>}
      imageDesiredWidth={100}
      imageUri={item.issue?.images?.[0]?.fullurl}
    />;
  }

  function _renderGridItem({ item }: FlatListItemVariables) {
    // 5 margin on left and right = 10
    // 2 margin between items = 4
    const width = (Dimensions.get('window').width - 10 - 4) / 3;

    return (
      <View style={styleSheet.gridItemView}>
        {item?.issue?.images?.length ?
          <ScaledImage
            resizeMode={'contain'}
            source={{ uri: item.issue.images[0].fullurl }}
            desiredWidth={width}
            proxyOptions={'200x'}
          />
          :
          <IssueImageAlternative issue={item.issue} width={width} aspectRatio={0.7} />
        }
      </View>
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
      <View>
        {showGrid ?
          <FlatList
            data={data?.pages?.flat()}
            renderItem={_renderGridItem}
            keyExtractor={item => item.issue_code}
            onEndReached={() => fetchNextPage()}
            numColumns={3}
            style={styleSheet.flatListGrid}
            key={'grid'}
            scrollEnabled={((data?.pages.length ?? 0) > 1)}
          />
          :
          <FlatList
            data={data?.pages?.flat()}
            renderItem={_renderListItem}
            keyExtractor={item => item.issue_code}
            ItemSeparatorComponent={() => <Separator width={'96%'} />}
            onEndReached={() => fetchNextPage()}
            style={styleSheet.flatListList}
            key={'list'}
            scrollEnabled={((data?.pages[0].length ?? 0) > 2)}
          />
        }
        <If statement={isFetchingNextPage}>
          <ActivityIndicator size={'large'} />
        </If>
      </View>
    );
  }

  return _render();
}
