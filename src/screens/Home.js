import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from '@ui-kitten/components';

import { ProfessorHome } from '../components/ProfessorHome';
import { StudentHome } from './Student';

import { storeUser } from '../utils/functions';
import { Admin } from '../components/Admin';
import { SERVER_URL } from '../utils/config';
import { CustomSpinner } from '../components/CustomSpinner';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

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
        .then((userData) => {
          setUser(userData);
          storeUser(userData);
          setLoading(false)
        });
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading){
    return (
          <Layout level="1" style={{ flex: 1 }}>
            <CustomSpinner/>
          </Layout>)
  }

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
