import React from 'react';
import _ from 'underscore';
import { StyleSheet } from 'react-native';
import { SubjectList } from '../components/SubjectList';
import { SearchBox } from '../components/SearchBox';
import { Layout, Tab, TabView } from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProfessorList } from '../components/ProfessorList';
import { getToken } from '../utils/authHelper';

// import AsyncStorage from '@react-native-community/async-storage';

export const Student = ({ user }) => {
  const [subjects, setSubjects] = React.useState([]);
  const [professors, setProfessors] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const fetchSubjects = async () => {
    const token = await getToken();
    try {
      const response = await fetch(
        'http://181.164.121.14:25565/subjects/findAll',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await response.json();
      setSubjects(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProffesors = async () => {
    const token = await getToken();
    fetch('http://181.164.121.14:25565/users/getAllProfessors', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setProfessors(json);
      });
  };
  React.useEffect(() => {
    fetchProffesors();
    fetchSubjects();
  }, [searchTerm]);

  const resultSubjects = !searchTerm
    ? subjects
    : subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
    );
  const resultProfessors = !searchTerm
    ? professors
    : professors.filter((profe) => {
      const nombre = profe.name.toLowerCase() + profe.surname.toLowerCase();
      return nombre.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
  return (
    <Layout level="1">
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Busqueda" />

      <TabView
        style={{ marginTop: 10 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="MATERIAS">
          <Layout>
            {!_.isEmpty(resultSubjects) ? (
              <SubjectList
                allSubjects={resultSubjects}
                followed={user.followedSubjects}
                refresh={fetchSubjects}
              />
            ) : loading ? (
              <CustomSpinner />
            ) : (
                  <ErrorMessage message="No Data" />
                )}
          </Layout>
        </Tab>
        <Tab title="PROFESORES">
          <ProfessorList professors={resultProfessors} />
        </Tab>
      </TabView>
    </Layout>
  );
};

const styles = StyleSheet.create({});
