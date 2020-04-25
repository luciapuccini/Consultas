import * as React from 'react';
import { Layout } from '@ui-kitten/components';

import { Professor } from './Professor';
import { Student } from './Student';
import AsyncStorage from '@react-native-community/async-storage';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState('role_student');
  React.useEffect(() => {
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem('USER_ID');
      // fetch(`http://181.164.121.14:25565/users/getUser/${id}`, {
      fetch(`http://www.mocky.io/v2/5ea4bb583000006e00ce2dc2`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
