import { Pressable, StyleSheet } from 'react-native';
import { H4 } from '../generic/Headings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/Navigation';
import { useTranslation } from 'react-i18next';
import { ActionButtonProps } from '../../types/types';
import colors from '../../styles/Colors';

const styleSheetV1 = StyleSheet.create({
  pressable: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontWeight: 'normal',
  },
});

const styleSheetV2 = StyleSheet.create({
  pressable: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
  },
  title: {},
});

const styleSheet = styleSheetV1;
export default function(props: ActionButtonProps) {
  const navigation = useNavigation<NativeStackScreenProps<ProfileStackParamList, 'Profile'>['navigation']>();
  const { t } = useTranslation();
  const { title, icon, routeName } = props;

  function onPress() {
    navigation.navigate(routeName!);
  }

  return (
    <>
      <Pressable
        {...props}
        onPress={routeName ? onPress : undefined}
        style={[styleSheet.pressable]}
      >
        {icon}
        <H4 style={styleSheet.title}>{t(title)}</H4>
      </Pressable>
    </>
  );
}
