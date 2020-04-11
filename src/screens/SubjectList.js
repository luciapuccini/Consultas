import React, { useState, useEffect } from 'react';
import { SubjectCard } from '../components/SubjectCard';
import { FlatList } from 'react-native';

const subjectPlaceholder = require('../assets/java.png');

const findSubjectImage = (subjectName) => {
  // const image = require(`../assets/${subjectName}.png`);
  return subjectPlaceholder;
};

export const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetch('http://www.mocky.io/v2/5e9108643300008c00e9cd5a')
      .then((response) => response.json())
      .then((json) => {
        setSubjects(json);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    const img = findSubjectImage(item.name);
    return <SubjectCard key={item.subjectId} name={item.name} image={img} />;
  };

  return <FlatList data={subjects} renderItem={renderItem} />;
};
