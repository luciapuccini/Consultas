import React from 'react';
import { SERVER_URL } from '../utils/config';
import { getToken } from '../utils/authHelper';
import { StudentTutorialStack, ProfessorTutorialStack } from './tutorial';

export const TutorialStack = () => {
  const [user, setUser] = React.useState('ROLE_STUDENT');

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
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
        });
    };
    fetchUser();
  }, []);
  return (
    <React.Fragment>
      {user.role === 'ROLE_PROFESSOR' ? (
        <ProfessorTutorialStack />
      ) : (
        <StudentTutorialStack />
      )}
    </React.Fragment>
  );
};
