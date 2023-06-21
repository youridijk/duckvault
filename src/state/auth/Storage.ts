import SInfo from 'react-native-sensitive-info';

export async function getStoredToken() {
  return SInfo.getItem('token', {});
}

export async function storedAuthToken(token: string) {
  return SInfo.setItem('token', token, {});
}

export async function deleteStoredAuthToken() {
  return SInfo.deleteItem('token', {});
}
