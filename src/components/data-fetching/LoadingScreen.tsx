import {useTranslation} from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

export default function () {
  const {t} = useTranslation();

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex:  1}}>
      <ActivityIndicator size='large' />
    </View>
  );
}
