import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ProfessorCard } from './ProfessorCard';

export const ProfessorList = ({ professors }) => {
  const [sortedProfes, setSortedProfes] = useState([]);
  useEffect(() => {
    setSortedProfes(professors.sort());
  }, [professors]);
  const renderItem = ({ item, index }) => {
    // const img = findSubjectImage(item.name);
    return <ProfessorCard professor={item} />;
  };

  return (
    <FlatList
      data={sortedProfes}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 80 }}
      keyExtractor={(item) => item.id}
    />
  );
};
