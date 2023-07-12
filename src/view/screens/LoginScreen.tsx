import {
  ActivityIndicator, Pressable,
  SafeAreaView,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { H2, H3, H4 } from '../../components/generic/Headings';
import { LoginScreenProps } from '../../types/Navigation';
import colors from '../../styles/Colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import If from '../../components/generic/basics/If';
import { Credentials } from '../../types/Auth';
import useAuth from '../../state/auth/useAuth';
import Separator from '../../components/generic/Separator';
import hairlineWidth = StyleSheet.hairlineWidth;
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
    flex: 2,
  },
  spacerBottom: {
    flex: 3,
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
  },
});


export default function({ navigation }: LoginScreenProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const credentialsFilled = username !== '' && password !== '';
  const { t } = useTranslation();

  const mutation = useMutation<void, { message: string }, Credentials>(
    login<Credentials>,
  );

  function loginImpl() {
    mutation.mutate({
      username,
      password,
      device_name: 'React Native ' + (Math.random() + 1).toString(36).substring(7),
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.spacerTop} />
      <H2 style={styles.title}>{t('account.loginToAccount')}</H2>
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
        <H3 style={styles.error}>{t(mutation.error?.message as string, { keyPrefix: 'backendErrors' })}</H3>
      </If>

      <Pressable
        style={[styles.button, { backgroundColor: credentialsFilled ? styles.button.backgroundColor : colors.grey }]}
        onPress={loginImpl}
        disabled={!credentialsFilled}
      >
        <Text style={styles.buttonText}>{t('input.login')}</Text>
      </Pressable>
      <ButtonSeparator />
      <Pressable
        style={[styles.button, { marginTop: 0 }]}
        onPress={() => navigation.navigate('Registration')}
      >
        <Text style={styles.buttonText}>{t('input.register')}</Text>
      </Pressable>
      <View style={styles.spacerBottom} />
    </SafeAreaView>
  );
}
