import useAuth from '../../state/auth/useAuth';
import TabBar from './TabBar';
import LoginStack from '../navigationstacks/LoginStack';
import If from '../../components/generic/basics/If';
import { ActivityIndicator } from 'react-native';

export default function() {
  const { authStatus } = useAuth();

  return (
    <>
      <If statement={authStatus === 'loading'}>
        <ActivityIndicator size={'large'} />
      </If>

      <If statement={authStatus === 'authenticated'}>
        <TabBar />
      </If>

      <If statement={authStatus === 'unauthenticated'}>
        <LoginStack />
      </If>
    </>
  );
}
