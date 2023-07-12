import { AuthStatus } from './AuthStatus';

export interface Credentials {
  username: string;
  password: string;
  device_name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at?: string;
  followers?: number;
  following?: number;
  private: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutHeaders extends Record<string, string> {
  'Authorization': string;
  'Accept': 'application/json';
}

export interface AuthContext<U> {
  user?: U;
  token?: string;
  authHeaders?: AutHeaders;
  login: <B>(body: B) => Promise<void>;
  register: <B>(body: B) => Promise<C>;
  authStatus: AuthStatus;
  logout: () => void;
}



