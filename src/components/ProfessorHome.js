import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';
import { SERVER_URL } from '../utils/config';
import FilterSubjects from '../components/FilterSubjects';
import { ErrorMessage } from '../components/ErrorMessage';

export const ProfessorHome = ({ user }) => {
  const [subjects, setSubjects] = useState([]);

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

  //FIXME: mejorar ?
  useEffect(() => {
    const searchVals = selectedCareer.map(({ row }) => row + 1);

    if (selectedYear.length > 0) {
      const filteredByYear = subjects.filter((subject) =>
        selectedYear.includes(subject.year),
      );
      setFilteredSubjects(filteredByYear);
    }
    if (selectedCareer.length > 0) {
      const filteredByCareer = subjects.filter((subject) => {
        const careerIds = subject.careers.map(({ id }) => id);
        return searchVals.every((elem) => {
          return careerIds.indexOf(elem) > -1;
        });
      });
      setFilteredSubjects(filteredByCareer);
    }

    if (selectedCareer.length > 0 && selectedYear.length > 0) {
      const filteredByCareer = subjects.filter((subject) => {
        const careerIds = subject.careers.map(({ id }) => id);
        return searchVals.every((elem) => careerIds.indexOf(elem) > -1);
      });
      const filtered = filteredByCareer.filter((subject) =>
        selectedYear.includes(subject.year),
      );
      setFilteredSubjects(filtered);
    }
    if (selectedCareer.length === 0 && selectedYear.length == 0) {
      setFilteredSubjects(subjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedCareer]);

  return (
    <Layout level="1">
      <FilterSubjects
        setSelectedYear={setSelectedYear}
        setSelectedCareer={setSelectedCareer}
      />
      {filteredSubjects.length === 0 && <ErrorMessage message="No data" />}
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
