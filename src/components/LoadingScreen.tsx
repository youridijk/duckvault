import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';

export default function () {
  const {t} = useTranslation();

  return <Text>{t('loading')}</Text>;
}
