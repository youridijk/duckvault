import { createContext } from 'react';
import { AuthContext, User } from '../../types/Auth';

const authContext = createContext<AuthContext<User> | undefined>(undefined);

export default authContext;
