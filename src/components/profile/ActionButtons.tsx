import { FlatList, StyleSheet, View } from 'react-native';
import ActionButton from './ActionButton';
import { ActionButton as ActionButtonType } from '../../types/types';
import Separator from '../generic/Separator';
import {
  ArchiveBoxIcon,
  HeartIcon,
  ListBulletIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/solid';
import colors from '../../styles/Colors';

const buttons: ActionButtonType[] = [
  {
    title: 'profile.buttons.privateCollection',
    icon: <ArchiveBoxIcon color={colors.white} />,
    routeName: 'PrivateCollection',
  },
  {
    title: 'profile.buttons.wishlist',
    icon: <ShoppingBagIcon color={colors.white} />,
  },
  {
    title: 'profile.buttons.favorites',
    icon: <HeartIcon color={colors.white} />,
  },
  {
    title: 'profile.buttons.lists',
    icon: <ListBulletIcon color={colors.white} />,
  },
];

const styleSheet = StyleSheet.create({
  view: {
    marginTop: 10,
    justifyContent: 'center',
  },
  separator: {
    width: '98%',
  },
});

export default function() {
  function _renderItem({ item: { title, icon, routeName } }: { item: ActionButtonType }) {
    return <ActionButton title={title} icon={icon} routeName={routeName} />;
  }

  return (
    <View style={styleSheet.view}>
      <Separator style={styleSheet.separator} />
      <FlatList
        data={buttons}
        renderItem={_renderItem}
        ItemSeparatorComponent={() => <Separator margin={2} style={styleSheet.separator} />}
        scrollEnabled={false}
      />
      <Separator style={styleSheet.separator} />
    </View>
  );
}
