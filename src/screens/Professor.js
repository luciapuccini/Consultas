import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SubjectList } from './SubjectList';

export const Professor = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SubjectList />
    </ScrollView>
  );
};
