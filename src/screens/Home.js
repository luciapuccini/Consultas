import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '@ui-kitten/components';

import { ProfessorHome } from '../components/ProfessorHome';
import { Student } from './Student';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState('ROLE_STUDENT');

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('TOKEN');
      fetch(`http://181.164.121.14:25565/users/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    };
    fetchUser();
  }, []);
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {user.role === 'ROLE_PROFESSOR' ? (
        <ProfessorHome user={user} />
      ) : (
        <Student user={user} />
      )}
    </Layout>
  );
};
