import {DefaultTheme} from '@react-navigation/native';
import colors from './Colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.white,
  },
};
