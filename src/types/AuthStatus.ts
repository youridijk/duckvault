export const AUTH_STATUS = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
} as const;

type ObjectValues<T> = T[keyof T];

export type AuthStatus = ObjectValues<typeof AUTH_STATUS>;
