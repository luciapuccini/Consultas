import moment from 'moment-timezone';
import _ from 'underscore';
import AsyncStorage from '@react-native-community/async-storage';
import { Dimensions } from 'react-native';

import { SERVER_URL } from './config';

// Time related helpers

export const getTime = (fecha) => {
  return moment(fecha);
};

export const getHora = (fecha) => {
    return moment(fecha).format('HH:mm a');
};

export const getFecha = (fecha) => {
  return moment(fecha).format('ll');
};

export const getDia = (fecha) => {
  return moment(fecha).format('dddd');
};

export const getFechaHora = (fecha) => {
  return  moment(fecha).format('lll a')
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

// FUNCTIONS
export const asArray = (obj) => {
  const turnitos = [];
  _.mapObject(obj, (value, key) => {
    turnitos.push({ starTime: key, alumnos: value });
  });
  return turnitos;
};

export const filterByCareer = (subjectsToFilter, searchTerms) =>
  subjectsToFilter.filter((subject) =>
    searchTerms.every((elem) => subject.careers.indexOf(elem) > -1),
  );

const PROFESSOR_ROLE = 'ROLE_PROFESSOR';
const STUDENT_ROLE = 'ROLE_STUDENT';
const ADMIN_ROLE = 'ROLE_ADMIN';
export const isProfessor = (value) => value === PROFESSOR_ROLE;
export const isStudent = (value) => value === STUDENT_ROLE;
export const isAdmin = (value) => value === ADMIN_ROLE;
// STORAGE
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
  switch (status) {
    case 'En Curso':
      return green1;
    case 'Cancelada':
      return red1;
    case "Finalizada":
      return "#5c5c5c";
    default:
      return blue1
  }
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const getEncodedImage = (base64Img) => ({
  uri: 'data:image/png;base64,' + base64Img,
});

export const sortClases = (clases)=> {
 return clases.sort((objA, objB) => moment(objB.initTime) - moment(objA.initTime))
}