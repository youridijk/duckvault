import { PropsWithChildren, useEffect, useState } from 'react';
import SInfo from 'react-native-sensitive-info';

import AuthContext from './AuthContext';
import settings from '../../Settings';
import { User, Credentials } from '../../types/Auth';
import { AUTH_STATUS, AuthStatus } from '../../types/AuthStatus';

export default function(props: PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const [authToken, setAuthToken] = useState<string>();
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AUTH_STATUS.LOADING);

  useEffect(() => {
    getStoredToken()
      .then(async token => {
        console.log('Store ', token);
        if (token) {
          setAuthToken(token);
          try {
            const user = await getUserData(token);
            setUser(user);
            setAuthStatus(AUTH_STATUS.AUTHENTICATED);
            return;
          } catch (e) {
            await deleteStoredAuthToken();
          }
        }

        setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
      });
  }, ['']);

  async function login({ email, password }: Credentials): Promise<void> {
    const url = `${settings.backendUrl}/auth/sanctum/login`;
    const body = {
      email,
      password,
      // TODO real device name instead of random string
      device_name: 'React Native ' + (Math.random() + 1).toString(36).substring(7),
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const responseBody = await response.json();
    if (response.ok && responseBody.token) {
      const { token } = responseBody;

      const user = await getUserData(token);
      setAuthToken(token);
      setAuthStatus(AUTH_STATUS.AUTHENTICATED);
      setUser(user);
      await storedAuthToken(token);
      return;
    }

    return Promise.reject(responseBody);
  }

  async function logout() {
    const url = `${settings.backendUrl}/auth/sanctum/logout`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + authToken,
      },
    });

    if (!response.ok) {
      const responseBody = await response.json();
      return Promise.reject(responseBody);
    }

    setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
    setAuthToken(undefined);
    setUser(undefined);
    await deleteStoredAuthToken();
  }

  async function getUserData(token?: string): Promise<User> {
    const url = `${settings.backendUrl}/auth/sanctum/user`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token ?? authToken,
      },
    });

    const responseBody = await response.json();

    if (response.ok) {
      return responseBody;
    }

    return Promise.reject(responseBody);
  }

  async function getStoredToken() {
    return SInfo.getItem('token', {});
  }

  async function storedAuthToken(token: string) {
    return SInfo.setItem('token', token, {});
  }

  async function deleteStoredAuthToken() {
    return SInfo.deleteItem('token', {});
  }

  return (
    <AuthContext.Provider value={{
      user,
      token: authToken,
      authStatus,
      login,
      logout,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}
