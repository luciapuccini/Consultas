import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { NextClassCard } from './NextClassCard';
import { useNavigation } from '@react-navigation/native';

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
    <Layout level="1">
      {!results ? (
        <CustomSpinner />
      ) : (
        results.map((clase) => {
          return <NextClassCard clase={clase} subject={subject} />;
        })
      )}
      <AddClass />
    </Layout>
  );
};

const AddClass = ({ addClase }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Add Class')}>
      <View style={style.fab}>
        <Icon name="plus" fill="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const style = {
  fab: {
    height: 60,
    width: 60,
    backgroundColor: '#8FD4F2',
    borderRadius: 30,
    padding: 5,
    bottom: 60,
    alignSelf: 'flex-end',
  },
};
export default SimpleClasessList;
