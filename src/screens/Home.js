import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '@ui-kitten/components';

import { ProfessorHome } from '../components/ProfessorHome';
import { Student } from './Student';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState('role_student');

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('TOKEN');
      fetch(`http://181.164.121.14:25565/users/getUser`, {
        // fetch(`http://www.mocky.io/v2/5ea4bb583000006e00ce2dc2`, {
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
      {/* WARNING TEMP user.role === 'role_professor' */}
      {true ? <ProfessorHome /> : <Student user={user} />}
    </Layout>
  );
};
