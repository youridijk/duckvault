import {
  ActivityIndicator, Pressable,
  SafeAreaView,
  StyleSheet, Text,
  TextInput,
  View,
} from 'react-native';
import { H2, H3, H4 } from '../../components/generic/Headings';
import { RegistrationScreenProps } from '../../types/Navigation';
import colors from '../../styles/Colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import If from '../../components/generic/basics/If';
import { Credentials } from '../../types/Auth';
import useAuth from '../../state/auth/useAuth';
import ButtonSeparator from '../../components/generic/ButtonSeparator';


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
  error: {
    color: 'red',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
  }
});


export default function({ navigation }: RegistrationScreenProps) {
  const { login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const passwordsEqual = password === passwordRepeat;
  const credentialsValid = username !== '' && password !== '' && passwordsEqual;
  const { t } = useTranslation();

  const mutation = useMutation<void, { message: string }, Credentials>(
    {
      mutationFn: async function(variables) {
        await register(variables);
        await login(variables);
      },
    },
  );

  function registerImpl() {
    mutation.mutate({
      username,
      password,
      device_name: 'React Native ' + (Math.random() + 1).toString(36).substring(7),
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.spacerTop} />
      <H2 style={styles.title}>{t('account.createAccount')}</H2>
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
      <TextInput
        style={styles.textInput}
        placeholder={t('input.passwordRepeat') as string}
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="password"
        inputMode="text"
        secureTextEntry={true}
      />

      <If statement={!passwordsEqual && passwordRepeat !== ''}>
        <H3 style={styles.error}>{t('account.passwordsNotEqual')}</H3>
      </If>

      <If statement={mutation.isLoading}>
        <ActivityIndicator size="large" />
      </If>

      <If statement={mutation.isError}>
        <H3 style={styles.error}>{t(mutation.error?.message as string, { keyPrefix: 'backendErrors' })}</H3>
      </If>

      <Pressable
        style={[styles.button, { backgroundColor: credentialsValid ? styles.button.backgroundColor : colors.grey }]}
        onPress={registerImpl}
        disabled={!credentialsValid}
      >
        <Text style={styles.buttonText}>{t('input.register')}</Text>
      </Pressable>
      <ButtonSeparator />
      <Pressable
        style={[styles.button, {marginTop: 0}]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>{t('input.login')}</Text>
      </Pressable>
      <View style={styles.spacerBottom} />
    </SafeAreaView>
  );
}
