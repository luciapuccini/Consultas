import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Layout, Icon, Tab, TabView } from '@ui-kitten/components';

import { ErrorMessage } from './ErrorMessage';

import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from '../utils/config';

export const Admin = ({ user }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const fetchSubjects = async () => {
    const token = await getToken();
    fetch(`${SERVER_URL}/subjects/findAll`, {
      method: 'GET',
      headers: {
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
    fetchSubjects();
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
    fetchProffesors();
  }, [user]);

  return (
    <Layout level="1">
      <TabView
        style={{ marginTop: 10 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="MATERIAS">
          <SubjectList subjects={subjects} fetchSubjects={fetchSubjects} />
        </Tab>
        <Tab title="CARRERAS">
          <CarrerList/>
        </Tab>
      </TabView>

      <AddSubject professors={professors} fetchSubjects={fetchSubjects} />
      <AddProfessor />
    </Layout>
  );
};

const CarrerList = ({ }) => (
  <Layout>
    
      <FlatList
        data={subjects}
        renderItem={({ item }) => renderItem(item, fetchSubjects)}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyExtractor={(item) => item.id}
      />
  
  </Layout>
);

const SubjectList = ({ subjects, fetchSubjects }) => (
  <Layout>
    {subjects && subjects.length === 0 ? (
      <ErrorMessage message="No hay materias, crea algunas" />
    ) : (
      <FlatList
        data={subjects}
        renderItem={({ item }) => renderItem(item, fetchSubjects)}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyExtractor={(item) => item.id}
      />
    )}
  </Layout>
);

const AddSubject = ({ professors, fetchSubjects }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Add Subject', {
          professors,
          refresh: fetchSubjects,
        })
      }
      style={style.touchableStyle}>
      <Icon name="plus" fill="#fff" style={style.FloatingButtonStyle} />
    </TouchableOpacity>
  );
};

const AddProfessor = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Add Professor')}
      style={style.touchable2Style}>
      <Icon
        name="person-add-outline"
        fill="#fff"
        style={style.FloatingButtonStyle}
      />
    </TouchableOpacity>
  );
};

const renderItem = (item, fetchSubjects) => (
  <SubjectCard subject={item} admin refresh={fetchSubjects} />
);

const style = {
  touchableStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  touchable2Style: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 100,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: '#8FD4F2',
    borderRadius: 25,
  },
};
