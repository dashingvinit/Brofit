import * as SecureStore from 'expo-secure-store';

export default async function getUser() {
  const userObject = await SecureStore.getItemAsync('user');
  if (!userObject) return;
  try {
    const user = JSON.parse(userObject);
    return user;
  } catch (error) {
    return null;
  }
}
