import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { getToken } from '../utils/authHelper';
import { SubjectCard } from './SubjectCard';
import { useNavigation } from '@react-navigation/native';

export const Admin = ({ user }) => {
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchSubjects = async () => {
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
      fetchSubjects();
    }
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
    fetchProffesors();
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
      <AddSubject professors={professors} />
    </Layout>
  );
};

const AddSubject = ({ professors }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Add Subject', { professors })}
      style={style.touchableStyle}>
      <Icon name="plus" fill="#fff" style={style.FloatingButtonStyle} />
    </TouchableOpacity>
  );
};

const renderItem = ({ item }) => {
  return <SubjectCard subject={item} admin />;
};

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

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: '#8FD4F2',
    borderRadius: 25,
  },
};
