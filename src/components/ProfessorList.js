import React, { useState } from 'react';
import { FlatList } from 'react-native';
import _ from 'underscore';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

import { ProfessorCard } from './ProfessorCard';

export const ProfessorList = ({ professors }) => {
  const renderItem = ({ item, index }) => {
    // const img = findSubjectImage(item.name);
    return <ProfessorCard professor={item} />;
  };

  return (
    <List>
      <ListItem itemDivider>
        <Text>A</Text>
      </ListItem>
      <ListItem>
        <Text>Aaron Bennet</Text>
      </ListItem>
      <ListItem>
        <Text>Ali Connors</Text>
      </ListItem>
      <ListItem itemDivider>
        <Text>B</Text>
      </ListItem>
      <ListItem>
        <Text>Bradley Horowitz</Text>
      </ListItem>
    </List>
  );
};
