import React from 'react';
import _ from 'underscore';
import { StyleSheet, View } from 'react-native';
import { SubjectList } from '../components/SubjectList';
import { SearchBox } from '../components/SearchBox';
import { Layout, Tab, TabView } from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProfessorList } from '../components/ProfessorList';
import { getToken } from '../utils/authHelper';
import { SERVER_URL } from '../utils/config';
import FilterSubjects from '../components/FilterSubjects';

export const StudentHome = ({ user }) => {
  const [subjects, setSubjects] = React.useState([]);
  const [filteredSubjects, setFilteredSubjects] = React.useState([]);
  const [professors, setProfessors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedYear, setSelectedYear] = React.useState([]);

  const fetchSubjects = async () => {
    const token = await getToken();
    try {
      const response = await fetch(`${SERVER_URL}/subjects/findAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setSubjects(json);
      setFilteredSubjects(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProffesors = async () => {
    const token = await getToken();
    fetch(`${SERVER_URL}/users/getAllProfessors`, {
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
  }, []);

  React.useEffect(() => {
    if (selectedYear.length > 0) {
      setLoading(true);
      const filteredByYear = subjects.filter((subject) =>
        selectedYear.includes(subject.year),
      );

      setFilteredSubjects(filteredByYear);
      setLoading(false);
    } else {
      fetchSubjects();
      // setFilteredSubjects(subjects);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  const resultSubjects = !searchTerm
    ? filteredSubjects
    : filteredSubjects.filter((subject) =>
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
      <View style={styles.row}>
        <SearchBox
          style={{ width: '70%', marginRight: 20 }}
          setSearchTerm={setSearchTerm}
          placeholder="Busqueda"
        />
        <FilterSubjects
          setSelectedYear={setSelectedYear}
          setSelectedCareer={() => console.log('select career in student')}
        />
      </View>
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

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});
