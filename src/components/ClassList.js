import React from 'react';
import { FlatList } from 'react-native';
import { ClassCard } from './ClassCard';

const classes = [
  {
    classId: '1',
    name: 'Consulta Algoritmos',
    professor: 'Adrian Meca',
    fechaInicio: '2020-02-04T22:44:30.652Z',
    duracion: '60',
    turnos: false,
  },
  {
    classId: '2',
    name: 'Consulta Diseño',
    professor: 'Adrian Meca',
    fechaInicio: '2020-02-14T22:44:30.652Z',
    duracion: '60',
    turnos: true,
  },
];

export const ClassList = () => {
  const renderItem = ({ item, index }) => {
    return <ClassCard data={item} />;
  };
  return <FlatList data={classes} renderItem={renderItem} />;
};
