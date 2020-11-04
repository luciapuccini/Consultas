import * as React from 'react';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '@ui-kitten/components';

import { ProfessorHome } from '../components/ProfessorHome';
import { StudentHome } from './Student';

import { storeUser } from '../utils/functions';
import { Admin } from '../components/Admin';
import { SERVER_URL } from '../utils/config';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState('ROLE_STUDENT');
  React.useEffect(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'TutorialStack' }, { name: 'Home' }],
      }),
    );
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('TOKEN');
      fetch(`${SERVER_URL}/users/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          storeUser(data);
        });
    };
    fetchUser();
  }, []);
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {user.role === 'ROLE_PROFESSOR' ? (
        <ProfessorHome user={user} />
      ) : user.role === 'ROLE_STUDENT' ? (
        <StudentHome user={user} />
      ) : (
        <Admin user={user} />
      )}
    </Layout>
  );
};
