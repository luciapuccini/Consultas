import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '@ui-kitten/components';

import { Professor } from './Professor';
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
      {user.role === 'role_professor' ? <Professor /> : <Student user={user} />}
    </Layout>
  );
};
