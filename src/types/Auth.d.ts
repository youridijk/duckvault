import { AuthStatus } from './AuthStatus';

export interface Credentials {
  username: string;
  password: string;
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

export interface AutHeaders {
  'Authorization': string;
  'Accept': 'application/json';
}

export interface AuthContext<U> {
  user?: U;
  token?: string;
  authHeaders?: AutHeaders;
  login: (credentials: Credentials) => Promise<void>;
  authStatus: AuthStatus;
  logout: () => void;
}



