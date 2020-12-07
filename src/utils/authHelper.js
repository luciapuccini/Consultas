import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('TOKEN');
  return token;
};
