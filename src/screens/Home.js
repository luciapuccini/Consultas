import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Professor } from './Professor';
import { Student } from './Student';

const isProfessor = false;
export const Home = ({ navigation }) => {
  return (
    <SafeAreaView>{isProfessor ? <Professor /> : <Student />}</SafeAreaView>
  );
};
