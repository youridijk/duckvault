import { createContext } from 'react';
import { AuthContext } from '../../types/Auth';

const authContext = createContext<AuthContext | undefined>(undefined);

export default authContext;
