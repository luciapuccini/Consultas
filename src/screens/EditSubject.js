import React, { useEffect, useState } from 'react';
import { Text, Layout, Icon, Button, Spinner } from '@ui-kitten/components';
import { getToken } from '../utils/authHelper';
import { find } from 'underscore';
import { ScrollView, View, Alert } from 'react-native';
import { SERVER_URL } from '../utils/config';

export const EditSubject = ({ route, navigation }) => {
  const { subjectId, name } = route.params.subject;
  const [loading, setLoading] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [subjectProfessors, setSubjectProfessors] = useState([]); //TO ADD
  const [subjectProfessorsToRemove, setSubjectProfessorsToRemove] = useState(
    [],
  ); //TO REMOVE
  const fetchProfessors = async () => {
    setLoading(true);
    const token = await getToken();
    fetch(`${SERVER_URL}/subjects/modifySubjectInfo/${subjectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {

        console.log(loading);
        //SET LIST OF PROFES
        setProfessors(json.allProfessors);
        // SET PROFES ENABLED FOR THIS SUBJECT
        setSubjectProfessors(json.subjectProfessors);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleProfessors = (profe) => {
    console.log('handleProfessors -> profe', profe);

    if (!find(subjectProfessors, (p) => p.id == profe.id)) {
      setSubjectProfessors([...subjectProfessors, profe]);
      const removedSubject = subjectProfessorsToRemove.filter(
        (p) => profe.id !== p.id,
      );
      setSubjectProfessorsToRemove([...removedSubject]);
    } else {
      Alert.alert('Ya esta habilitado');
    }
  };

  const handleRemoveProfessors = (profe) => {
    console.log('handleRemoveProfessors -> profe', profe);

    const removedSubject = subjectProfessors.filter((p) => profe.id !== p.id);
    setSubjectProfessors([...removedSubject]);
    setSubjectProfessorsToRemove([...subjectProfessorsToRemove, profe]);
  };

  const handleConfirm = async () => {
    const token = await getToken();
    const body = {
      id: subjectId,
      subjectProfessors: getIds(subjectProfessors), //solo IDS
      subjectProfessorsToRemove: getIds(subjectProfessorsToRemove), //solo IDS
    };

    fetch(`${SERVER_URL}/subjects/modify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.message);
        navigation.goBack();
      });
  };

  return (
    <Layout level="1" style={style.layout}>
      {!loading ? (
        <ScrollView>
          <Text category="h5">Habilitados en {name}</Text>
          {subjectProfessors.map((profe) => (
            <Button
              appearance="ghost"
              style={style.profeRowStyle}
              onPress={() => handleRemoveProfessors(profe)}
              accessoryLeft={RemoveIcon}>
              <Text>
                {profe.name} {profe.surname}
              </Text>
            </Button>
          ))}
          <View style={{ marginTop: 10, marginBottom: 10 }} />
          <Text category="h5">Lista de Profesores</Text>
          {professors.map((profe) => (
            <Button
              appearance="ghost"
              style={style.profeRowStyle}
              onPress={() => handleProfessors(profe)}>
              <Text>
                {profe.name} {profe.surname}
              </Text>
            </Button>
          ))}
          <Button
            style={{ alignSelf: 'flex-end', marginTop: 10 }}
            onPress={handleConfirm}>
            Confirmar
          </Button>
        </ScrollView>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

const RemoveIcon = (props) => {
  const statusColor = '#C62828';
  return <Icon {...props} name="close" fill={statusColor} />;
};

const getIds = (profes) => {
  console.log('getIds -> profes', profes);
  console.log(
    'getIds -> profes.map((p) => p.id);',
    profes.map((p) => p.id),
  );
  return profes.map((p) => p.id);
};

const style = {
  layout: {
    flex: 1,
    padding: 15,
  },
  profeRowStyle: {
    justifyContent: 'flex-start',
    borderBottomColor: '#90CAF9',
    borderBottomWidth: 1,
    borderRadius: 0,
  },
};
