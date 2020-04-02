import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Professor } from './Professor';
import { Student } from './Student';
export const Home = ({ navigation }) => {
  const isAdmin = true;

  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {isAdmin ? <Professor /> : <Student />}
    </SafeAreaView>
  );
};
