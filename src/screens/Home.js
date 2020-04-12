import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Professor } from './Professor';
import { Student } from './Student';

export const Home = ({ navigation }) => {
  const [userRole, setUserRole] = React.useState('role_student');
  React.useEffect(() => {
    fetch('http://www.mocky.io/v2/5e9375963000009100156abe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer asd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserRole(data.role);
      });
  }, []);
  return (
    <SafeAreaView>
      {userRole === 'role_professor' ? <Professor /> : <Student />}
    </SafeAreaView>
  );
};
