import * as React from 'react';
import { Professor } from './Professor';
import { Student } from './Student';
import { Layout } from '@ui-kitten/components';

export const Home = ({ navigation }) => {
  const [userRole, setUserRole] = React.useState('role_student');
  React.useEffect(() => {
    // http://www.mocky.io/v2/5e9375963000009100156abe
    // http://www.mocky.io/v2/5e97d5a03000008500b6e093
    fetch('http://www.mocky.io/v2/5e9375963000009100156abe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer asd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data.role);
      });
  }, []);
  return (
    <Layout level="1">
      {userRole === 'role_professor' ? <Professor /> : <Student />}
    </Layout>
  );
};
