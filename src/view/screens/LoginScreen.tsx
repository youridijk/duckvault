import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { H2, H3 } from '../../components/generic/Headings';
import { LoginScreenProps } from '../../types/Navigation';
import colors from '../../styles/Colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import If from '../../components/generic/basics/If';
import { Credentials } from '../../types/Auth';
import useAuth from '../../state/auth/useAuth';


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 17,
    marginHorizontal: 30,
    marginVertical: 15,
    borderRadius: 10,
  },
  spacerTop: {
    flex: 3,
  },
  spacerBottom: {
    flex: 4,
  },
  button: {
    backgroundColor: colors.secondary,
    marginHorizontal: 70,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
});


export default function({ navigation }: LoginScreenProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('test'); // TODO DELETE
  const [password, setPassword] = useState('password');
  const { t } = useTranslation();
  const mutation = useMutation<void, { message: string }, Credentials>(
    login<Credentials>,
    {
      onSuccess: function() {
        console.log('succes');
        // navigation.navigate('TabBar');
      },
    },
  );

  function loginImpl() {
    mutation.mutate({
      username,
      password,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.spacerTop} />
      <TextInput
        style={styles.textInput}
        placeholder={t('input.username') as string}
        value={username}
        onChangeText={setUsername}
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="username"
        inputMode="email"
      />
      <TextInput
        style={styles.textInput}
        placeholder={t('input.password') as string}
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="password"
        inputMode="text"
        secureTextEntry={true}
      />
      <If statement={mutation.isLoading}>
        <ActivityIndicator size="large" />
      </If>

      <If statement={mutation.isError}>
        <H3 style={{ textAlign: 'center' }}>{mutation.error?.message}</H3>
      </If>

      <TouchableOpacity
        style={styles.button}
        onPress={loginImpl}
      >
        <H2 style={{ textAlign: 'center' }}>{t('input.login')}</H2>
      </TouchableOpacity>
      <View style={styles.spacerBottom} />
    </SafeAreaView>
  );
}
