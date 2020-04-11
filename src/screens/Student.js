import React from 'react';
import { ScrollView, View } from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { SubjectList } from './SubjectList';

export const Student = () => {
  return (
    <>
      <View style={{ marginLeft: 20, marginTop: 10, width: '90%' }}>
        <Item>
          <Icon active name="search" />
          <Input placeholder="Materia" />
        </Item>
      </View>
      <SubjectList />
    </>
  );
};
