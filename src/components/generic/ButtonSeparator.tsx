import { StyleSheet, View } from 'react-native';
import { H4 } from './Headings';
import colors from '../../styles/Colors';
import hairlineWidth = StyleSheet.hairlineWidth;
import { useTranslation } from 'react-i18next';

const styleSheet = StyleSheet.create({
  choiceView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 15,
  },
  choiceText: {
    flex: 1,
    textAlign: 'center',
  },
  choiceLineView: {
    flex: 2,
    borderBottomWidth: hairlineWidth,
    borderColor: colors.grey,
  },
});
export default function() {
  const { t } = useTranslation();

  return (
    <View style={styleSheet.choiceView}>
      <View style={styleSheet.choiceLineView} />
      <H4 style={styleSheet.choiceText}>{t('account.or')}</H4>
      <View style={styleSheet.choiceLineView} />
    </View>
  );
}
