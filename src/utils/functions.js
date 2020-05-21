import moment from 'moment';
import _ from 'underscore';
import AsyncStorage from '@react-native-community/async-storage';

export const getHora = (fecha) => {
  return moment(fecha).locale('es').format('HH:mm');
};
export const getFecha = (fecha) => {
  return moment(fecha).locale('es').format('ll');
};
export const asMinutes = (text) => {
  const time = parseInt(text);
  const hours = moment.duration(time, 'hours');
  return hours;
};
export const timeToStart = (initTime) => {
  const now = moment();
  const future = moment(initTime);
  return now.diff(future, 'minute');
};
export const asArray = (obj) => {
  const turnitos = [];
  _.mapObject(obj, (value, key) => {
    turnitos.push({ starTime: key, alumnos: value });
  });
  return turnitos;
};

export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('LEGAJO', user.legajo);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getUserLegajo = async (user) =>
  await AsyncStorage.getItem('LEGAJO');

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('LEGAJO');
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getUserImage = (id) => {
  console.log(id);
  return {
    uri: `http://181.164.121.14:25565/users/images/profileImages/${id}`,
  };
};
