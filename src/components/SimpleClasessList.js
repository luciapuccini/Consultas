import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { NextClassCard } from './NextClassCard';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const results = [
  {
    endTime: '2020-05-12T18:30:00',
    hasSingleTurnos: false,
    id: '2a0abdb070714dd281960650212e8cf2',
    initTime: '2020-05-12T18:30:00',
    professor: {
      email: 'augustoarlt95@gmail.com',
      id: '1931f41de1fd4cb8affbcf4bc9e9ae79',
      legajo: '2',
      mobile: 'secret',
      name: 'Augusto prof',
      profileImagePath: null,
      role: 'ROLE_PROFESSOR',
      showMobile: false,
      surname: 'Arlt prof',
    },
    status: 'Confirmada',
  },
  {
    endTime: '2020-05-11T15:56:00',
    hasSingleTurnos: true,
    id: '8fce149eadfd4e01a04ae457da6dbe85',
    initTime: '2020-05-11T15:26:00',
    professor: {
      email: 'augustoarlt95@gmail.com',
      id: '1931f41de1fd4cb8affbcf4bc9e9ae79',
      legajo: '2',
      mobile: 'secret',
      name: 'Augusto prof',
      profileImagePath: null,
      role: 'ROLE_PROFESSOR',
      showMobile: false,
      surname: 'Arlt prof',
    },
    status: 'En curso',
  },
  {
    endTime: '2020-05-19T15:56:00',
    hasSingleTurnos: true,
    id: 'a715924c2cd647a6aa95b78f248127d0',
    initTime: '2020-05-19T15:26:00',
    professor: {
      email: 'augustoarlt95@gmail.com',
      id: '1931f41de1fd4cb8affbcf4bc9e9ae79',
      legajo: '2',
      mobile: 'secret',
      name: 'Augusto prof',
      profileImagePath: null,
      role: 'ROLE_PROFESSOR',
      showMobile: false,
      surname: 'Arlt prof',
    },
    status: 'Confirmada',
  },
  {
    endTime: '2020-05-12T18:30:00',
    hasSingleTurnos: false,
    id: '2a0abdb070714dd281960650212e8cf2',
    initTime: '2020-05-12T18:30:00',
    professor: {
      email: 'augustoarlt95@gmail.com',
      id: '1931f41de1fd4cb8affbcf4bc9e9ae79',
      legajo: '2',
      mobile: 'secret',
      name: 'Augusto prof',
      profileImagePath: null,
      role: 'ROLE_PROFESSOR',
      showMobile: false,
      surname: 'Arlt prof',
    },
    status: 'Confirmada',
  },
  {
    endTime: '2020-05-12T18:30:00',
    hasSingleTurnos: false,
    id: '2a0abdb070714dd281960650212e8cf2',
    initTime: '2020-05-12T18:30:00',
    professor: {
      email: 'augustoarlt95@gmail.com',
      id: '1931f41de1fd4cb8affbcf4bc9e9ae79',
      legajo: '2',
      mobile: 'secret',
      name: 'Augusto prof',
      profileImagePath: null,
      role: 'ROLE_PROFESSOR',
      showMobile: false,
      surname: 'Arlt prof',
    },
    status: 'Confirmada',
  },
];

const SimpleClasessList = ({ subject, manager }) => {
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!results ? (
        <CustomSpinner />
      ) : (
        <ScrollView>
          {results.map((clase) => {
            console.log('cuantas', clase.id);
            return <NextClassCard clase={clase} subject={subject} />;
          })}
        </ScrollView>
      )}
      <AddClass subjectId={subject.subjectId} />
    </Layout>
  );
};

const AddClass = ({ subjectId }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Add Class', { subjectId })}
      style={style.touchableStyle}>
      <Icon name="plus" fill="#fff" style={style.FloatingButtonStyle} />
    </TouchableOpacity>
  );
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
export default SimpleClasessList;
