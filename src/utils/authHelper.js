import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('TOKEN');
  return token;
};

export const setIsFirstLogin = async (value) =>
  await AsyncStorage.setItem('IS_FIRST_LOGIN', JSON.stringify(value));

export const getIsFirstLogin = async () =>
  await AsyncStorage.getItem('IS_FIRST_LOGIN');
