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
