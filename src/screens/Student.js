import React from 'react';
import _ from 'underscore';
import { StyleSheet } from 'react-native';
import { SubjectList } from '../components/SubjectList';
import { SearchBox } from '../components/SearchBox';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
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

  React.useEffect(() => {
    const fetchSubjects = async () => {
      const token = await getToken();
      try {
        const response = await fetch(
          // 'http://www.mocky.io/v2/5e9b5df63300005000bf1784',
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
      // fetch('http://www.mocky.io/v2/5ea262b63100006b8f1ef091', {
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
    : professors.filter((profe) =>
        profe.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
  return (
    <Layout level="1">
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Busqueda" />

      <TabView
        style={{ marginTop: 10 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="SUBJECTS">
          <Layout style={styles.tabContainer}>
            {!_.isEmpty(resultSubjects) ? (
              <SubjectList
                allSubjects={resultSubjects}
                followed={user.followedSubjects}
              />
            ) : loading ? (
              <CustomSpinner />
            ) : (
              <ErrorMessage message="No Data" />
            )}
          </Layout>
        </Tab>

        <Tab title="PROFES">
          <Layout style={styles.tabContainer}>
            <ProfessorList professors={resultProfessors} />
          </Layout>
        </Tab>
      </TabView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
