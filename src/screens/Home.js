import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Professor } from './Professor';
import { Student } from './Student';
import { AppConsumer } from '../../App';

const isProfessor = true;
export const Home = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {isProfessor ? <Professor /> : <Student />}
    </SafeAreaView>
  );
};
