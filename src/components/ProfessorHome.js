import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';
import { SERVER_URL } from '../utils/config';
import FilterSubjects from '../components/FilterSubjects';
import { filterByCareer } from '../utils/functions';

export const ProfessorHome = ({ user }) => {
  const [subjects, setSubjects] = useState([]);
  console.log(
    '🚀 ~ file: ProfessorHome.js ~ line 12 ~ ProfessorHome ~ subjects',
    subjects,
  );
  const [selectedCareer, setSelectedCareer] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

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
        setFilteredSubjects(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user.id) {
      fetchProfessorSubjects();
    }
  }, [user]);

  useEffect(() => {
    if (selectedCareer.length > 0 && selectedYear.length > 0) {
      const filteredByCareer = subjects.filter((subject) =>
        selectedCareer.every((elem) => subject.careers.indexOf(elem) > -1),
      );
      const filtered = filteredByCareer.filter((subject) =>
        selectedYear.includes(subject.year),
      );
      setFilteredSubjects(filtered);
    }
    if (selectedYear.length > 0) {
      const filteredByYear = subjects.filter((subject) =>
        selectedYear.includes(subject.year),
      );
      setFilteredSubjects(filteredByYear);
    }
    if (selectedCareer.length > 0) {
      const filteredByCareer = subjects.filter((subject) =>
        selectedCareer.every((elem) => subject.careers.indexOf(elem) > -1),
      );

      setFilteredSubjects(filteredByCareer);
    }

    setFilteredSubjects(subjects);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedCareer]);

  return (
    <Layout level="1">
      <FilterSubjects
        setSelectedYear={setSelectedYear}
        setSelectedCareer={setSelectedCareer}
        multi
      />
      {!subjects ? (
        <CustomSpinner />
      ) : (
        <FlatList
          data={filteredSubjects}
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
