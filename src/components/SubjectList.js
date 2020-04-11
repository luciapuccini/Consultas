import React from 'react';
import { SubjectCard } from './SubjectCard';
import { FlatList } from 'react-native';

const subjectPlaceholder = require('../assets/java.png');

const findSubjectImage = (subjectName) => {
  // const image = require(`../assets/${subjectName}.png`);
  return subjectPlaceholder;
};

export const SubjectList = ({ subjects }) => {
  const renderItem = ({ item, index }) => {
    const img = findSubjectImage(item.name);
    return <SubjectCard name={item.name} image={img} />;
  };

  return <FlatList data={subjects} renderItem={renderItem} />;
};
