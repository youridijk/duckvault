import { AuthStatus } from './AuthStatus';

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at?: string;
  private: boolean;
  created_at: string;
  updated_at: string;
}


export interface AuthContext {
  user?: User;
  token?: string;
  login: (credentials: Credentials) => Promise<void>;
  authStatus: AuthStatus;
  logout: () => void;
}



