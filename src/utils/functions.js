import moment from 'moment-timezone';
import _ from 'underscore';
import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions } from 'react-native';

import { SERVER_URL } from './config';

const ARG = 'America/Argentina/Buenos_Aires';

export const getTime = (fecha) => {
  return moment.utc(fecha);
};
export const getHora = (fecha) => {
  const fixFecha = fecha.concat('Z');
  return moment
    .tz(fixFecha, 'America/Argentina/Buenos_Aires')
    .format('HH:mm a');
};
export const getFecha = (fecha) => {
  const fixFecha = fecha.concat('Z');
  return moment(fixFecha).tz(ARG).locale('es').format('ll');
};
export const getDia = (fecha) => {
  const fixFecha = fecha.concat('Z');
  return moment(fixFecha).tz(ARG).locale('es').format('dddd');
};
export const getFechaHora = (fecha) => {
  const fixFecha = fecha.concat('Z');
  return moment(fixFecha).tz(ARG).locale('es').format('lll a');
};

export const asMinutes = (text) => {
  const time = parseInt(text);
  const hours = moment.duration(time, 'hours');
  return hours;
};
export const timeToStart = (initTime) => {
  const now = moment();
  const future = moment(initTime).tz(ARG);

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
    await AsyncStorage.setItem('USER_TYPE', user.role);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getUserRole = async () => await AsyncStorage.getItem('USER_TYPE');

export const getUserLegajo = async () => await AsyncStorage.getItem('LEGAJO');

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('LEGAJO');
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getUserImage = (id) =>
  `${SERVER_URL}/users/images/profileImages/${id}`;

export const getSubjectImage = (subjectId) =>
  `${SERVER_URL}/subjects/images/${subjectId}`;

export const green1 = '#66BB6A';
export const red1 = '#E53935';
export const blue1 = '#64B5F6';

export const getClassColor = (status) => {
  const color =
    status === 'En Curso' ? green1 : status === 'Cancelada' ? red1 : blue1;
  return color;
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
