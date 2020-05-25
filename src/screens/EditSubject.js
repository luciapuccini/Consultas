import React, { useEffect, useState } from 'react';
import { Text, Layout, Icon, Button } from '@ui-kitten/components';
import { getToken } from '../utils/authHelper';
import { View } from 'react-native';

export const EditSubject = ({ route }) => {
  const { subjectId } = route.params.subject;
  const [professors, setProfessors] = useState([]);
  const [subjectProfessors, setSubjectProfessors] = useState([]); //TO ADD
  const [subjectProfessorsToRemove, setSubjectProfessorsToRemove] = useState(
    [],
  ); //TO REMOVE

  useEffect(() => {
    const fetchProfessors = async () => {
      const token = await getToken();
      fetch(
        `http://181.164.121.14:25565/subjects/modifySubjectInfo/${subjectId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((json) => {
          console.log('fetchProfessors -> json', json.subjectProfessors);
          setProfessors(json.subjectProfessors);
          professors.forEach((p) => {
            setSubjectProfessors([...subjectProfessors, p.id]);
          });
        });
    };
    fetchProfessors();
  }, []);

  const handleProfessors = (profe) => {
    if (subjectProfessors.includes(profe.id)) {
      //pertenece a add
      const removedSubject = subjectProfessors.filter((p) => profe.id !== p);
      //saco de add
      setSubjectProfessors([...removedSubject]);
      // agrego en toRemove
      setSubjectProfessorsToRemove([...subjectProfessorsToRemove, profe.id]);
    } else {
      //no estaba para add
      // lo agrego
      setSubjectProfessors([...subjectProfessors, profe.id]);
      // no puede estar en toRemove
      const removedSubject = subjectProfessorsToRemove.filter(
        (p) => profe.id != p,
      );
      setSubjectProfessorsToRemove([...removedSubject]);
    }
  };
  const handleConfirm = async () => {
    const token = await getToken();
    const body = {
      id: subjectId,
      subjectProfessors,
      subjectProfessorsToRemove,
    };
    console.log('handleConfirm -> body', body);
    fetch(`http://181.164.121.14:25565/subjects/modify`, {
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
      });
  };
  return (
    <Layout level="1" style={style.layout}>
      <Text category="h5">Profesores Habilitados</Text>

      {professors.map((profe) => {
        return (
          <Button
            appearance="ghost"
            onPress={() => handleProfessors(profe)}
            style={{
              justifyContent: 'flex-start',
              borderBottomColor: '#b0bec5',
              borderBottomWidth: 1,
              borderRadius: 0,
            }}
            accessoryLeft={
              subjectProfessors.length > 0 &&
              subjectProfessors.includes(profe.id)
                ? StatusIcon
                : RemoveIcon
            }>
            <Text>{profe.name}</Text>
          </Button>
        );
      })}
      <Button
        style={{ alignSelf: 'flex-end', marginTop: 10 }}
        onPress={handleConfirm}>
        Confirmar
      </Button>
    </Layout>
  );
};

const StatusIcon = (props) => {
  const statusColor = '#00C853';
  return <Icon {...props} name="checkmark-circle-outline" fill={statusColor} />;
};
const RemoveIcon = (props) => {
  const statusColor = '#C62828';
  return <Icon {...props} name="close" fill={statusColor} />;
};

const style = {
  layout: {
    flex: 1,
    padding: 15,
  },
};
