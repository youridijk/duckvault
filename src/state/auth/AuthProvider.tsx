import { PropsWithChildren, useEffect, useState } from 'react';
import { authContext } from './useAuth';
import settings from '../../Settings';
import { User, Credentials } from '../../types/Auth';
import { AUTH_STATUS, AuthStatus } from '../../types/AuthStatus';
import { getStoredToken, storedAuthToken, deleteStoredAuthToken } from './Storage';

type FetchError = {
  status: number;
  body: any;
};

export default function(props: PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const [authToken, setAuthToken] = useState<string>();
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AUTH_STATUS.LOADING);

  useEffect(() => {
    getStoredToken()
      .then(async token => {
        if (token) {
          setAuthToken(token);
          try {
            const user = await getUserData(token);
            setUser(user);
            setAuthStatus(AUTH_STATUS.AUTHENTICATED);
            return;
          } catch (e: any) {
            if (e.status === 401) {
              await deleteStoredAuthToken();
            }
          }
        }

        setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
      });
  }, ['']);

  async function login<B>(body: B): Promise<void> {
    const url = `${settings.backendUrl}/auth/sanctum/login`;
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
      setUser(user);
      setAuthStatus(AUTH_STATUS.AUTHENTICATED);
      await storedAuthToken(token);
      return;
    }

    return Promise.reject(responseBody);
  }


  async function register<B>(body: B): Promise<B> {
    const url = `${settings.backendUrl}/auth/jwt/register`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const responseBody = await response.json();

    if (response.ok) {
      console.log(responseBody);
      return responseBody;
    }

    return Promise.reject(responseBody);
  }

  async function logout(): Promise<void> {
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

    return Promise.reject({ status: response.status, body: responseBody });
  }

  return (
    <authContext.Provider value={{
      user,
      token: authToken,
      authStatus,
      authHeaders: authToken ? {'Authorization': 'Bearer ' + authToken, 'Accept': 'application/json'} : undefined,
      login,
      register,
      logout,
    }}>
      {props.children}
    </authContext.Provider>
  );
}
