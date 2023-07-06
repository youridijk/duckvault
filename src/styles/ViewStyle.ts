import colors from './Colors';
import { ViewStyle } from 'react-native';

export default {
  default: {
    backgroundColor: colors.background,
    height: '100%',
  },
} satisfies Record<string, ViewStyle>;
