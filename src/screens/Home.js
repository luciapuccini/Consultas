import * as React from 'react';
import { Layout } from '@ui-kitten/components';

import { Professor } from './Professor';
import { Student } from './Student';

export const Home = ({ navigation }) => {
  const [user, setUser] = React.useState('role_student');
  React.useEffect(() => {
    // http://www.mocky.io/v2/5e9375963000009100156abe
    // http://www.mocky.io/v2/5e97d5a03000008500b6e093
    fetch('http://www.mocky.io/v2/5e9bc3843300009532bf1813', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer asd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {user.role === 'role_professor' ? <Professor /> : <Student user={user} />}
    </Layout>
  );
};
