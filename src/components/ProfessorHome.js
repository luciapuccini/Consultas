import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';
import { SERVER_URL } from '../utils/config';
import FilterSubjects from '../components/FilterSubjects';

export const ProfessorHome = ({ user }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedYear, setSelectedYear] = React.useState([]);

  const fetchProfessorSubjects = async () => {
    const token = await getToken();
    const { id } = user;
    fetch(`${SERVER_URL}/users/getProfessorSubjects/${id}`, {
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

  useEffect(() => {
    if (user.id) {
      fetchProfessorSubjects();
    }
  }, [user]);

  React.useEffect(() => {
    if (selectedYear) {
      // setLoading(true);
      const filteredByYear = subjects.filter(
        (subject) => subject.year === selectedYear,
      );

      setSubjects(filteredByYear);
      // setLoading(false);
    } else {
      fetchProfessorSubjects();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  return (
    <Layout level="1">
      <FilterSubjects setSelectedYear={setSelectedYear} multi />
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
