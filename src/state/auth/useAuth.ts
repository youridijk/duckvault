import { createContext, useContext } from 'react';
import { AuthContext, User } from '../../types/Auth';

export const authContext = createContext<AuthContext<User> | undefined>(undefined);
export default function(){
  return useContext(authContext)!;
}
