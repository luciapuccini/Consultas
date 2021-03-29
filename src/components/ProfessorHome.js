import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { View } from 'native-base';

import { CustomSpinner } from './CustomSpinner';
import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';
import { SERVER_URL } from '../utils/config';
import FilterSubjects from '../components/FilterSubjects';
import { ErrorMessage } from '../components/ErrorMessage';
import {SearchBox} from '../components/SearchBox'

export const ProfessorHome = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [searchTerm, setSearchTerm] = React.useState('');


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
        if(data.length ===0) {setError(true)}
        setSubjects(data);
        setFilteredSubjects(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true)
    if (user.id) {
      fetchProfessorSubjects();
    }
    setLoading(false)
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

  if(error) {
    return (
          <Layout level="1">
             <ErrorMessage message="No data" />
          </Layout>)
  }

  return (
    <Layout level="1">
        <View style={{display:'flex',flexDirection:'row' }}>
          <SearchBox
          style={{ width: '70%', marginRight: 20 }}
          setSearchTerm={setSearchTerm}
          placeholder="Busqueda"
        />
      <FilterSubjects
        setSelectedYear={setSelectedYear}
        setSelectedCareer={setSelectedCareer}
      />
      </View>
      
      {loading ? (
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
