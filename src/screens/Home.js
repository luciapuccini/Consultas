import * as React from 'react';
import { Layout } from '@ui-kitten/components';

import { Professor } from './Professor';
import { Student } from './Student';
import AsyncStorage from '@react-native-community/async-storage';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState('role_student');
  React.useEffect(() => {
    // http://www.mocky.io/v2/5e9375963000009100156abe
    // http://www.mocky.io/v2/5e97d5a03000008500b6e093
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem('USER_ID');
      fetch(`http://181.164.121.14:25565/users/getUser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          console.log('AUgusto se la come', data);
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
