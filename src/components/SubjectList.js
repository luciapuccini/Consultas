import React from 'react';
import { SubjectCard } from './SubjectCard';
import { FlatList } from 'react-native';

export const SubjectList = ({ subjects }) => {
  const renderItem = ({ item, index }) => {
    // const img = findSubjectImage(item.name);
    return <SubjectCard subject={item} />;
  };

  return (
    <FlatList
      data={subjects}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};
