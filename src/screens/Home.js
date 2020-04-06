import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Professor } from './Professor';
import { Student } from './Student';
import { Context } from '../context/AuthContext';
const isProfessor = true;
export const Home = ({ navigation }) => {
  const { state } = React.useContext(Context);
  console.log(state.userToken, 'AFTER');
  return (
    <SafeAreaView>{isProfessor ? <Professor /> : <Student />}</SafeAreaView>
  );
};
