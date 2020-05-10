import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';

export const ProfessorHome = ({ user }) => {
  // TODO: Professor flow
  // Alta clases, Baja, ==> clases/add
  // Alta comentarios, baja
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchProfessorSubjects = async () => {
      const token = await getToken();
      const { id } = user;
      fetch(`http://181.164.121.14:25565/users/getProfessorSubjects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSubjects(data);
        })
        .catch((error) => console.log(error));
    };
    if (user.id) {
      fetchProfessorSubjects();
    }
  }, [user]);

  return (
    <Layout level="1">
      {!subjects ? (
        <CustomSpinner />
      ) : (
        <FlatList
          data={subjects}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item) => item.id}
        />
      )}
    </Layout>
  );
};

const renderItem = ({ item }) => {
  return <SubjectCard subject={item} professor />;
};
