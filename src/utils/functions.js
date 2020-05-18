import moment from 'moment';
import _ from 'underscore';

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
