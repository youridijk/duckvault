import { useContext } from 'react';
import authContext from './AuthContext';
import { AuthContext } from '../../types/Auth';

export default function(): AuthContext {
  return <AuthContext>useContext(authContext);
}
