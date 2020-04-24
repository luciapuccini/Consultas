import React, { useState } from 'react';
import { FlatList } from 'react-native';
import _ from 'underscore';

import { ProfessorCard } from './ProfessorCard';

export const ProfessorList = ({ professors }) => {
  // const [professors, setProfessors] = useState([]);
  // React.useEffect(() => {
  //   const fetchProffesors = () => {
  //     fetch('http://www.mocky.io/v2/5ea262b63100006b8f1ef091', {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setProfessors(json);
  //       });
  //   };
  //   fetchProffesors();
  // }, []);

  const renderItem = ({ item, index }) => {
    // const img = findSubjectImage(item.name);
    return <ProfessorCard professor={item} />;
  };

  return (
    <FlatList
      data={professors}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name}
      contentContainerStyle={{ paddingBottom: 360 }}
    />
  );
};
