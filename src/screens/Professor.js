import React, { Component } from 'react';

import { SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Item, Input, Icon } from 'native-base';

import { SubjectList } from './SubjectList';

export const Professor = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Item>
          <Icon active name="search" />
          <Input placeholder="Materia" />
        </Item>
      </View>
      <SubjectList />
    </ScrollView>
  );
};
