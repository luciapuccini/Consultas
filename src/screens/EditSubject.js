import React, { useEffect, useState } from 'react';
import { Text, Layout, Icon, Button, Spinner } from '@ui-kitten/components';
import { getToken } from '../utils/authHelper';
import { isEmpty } from 'underscore';

export const EditSubject = ({ route, navigation }) => {
  const { subjectId } = route.params.subject;
  const [loading, setLoading] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [subjectProfessors, setSubjectProfessors] = useState([]); //TO ADD
  const [subjectProfessorsToRemove, setSubjectProfessorsToRemove] = useState(
    [],
  ); //TO REMOVE
  const fetchProfessors = async () => {
    setLoading(true);
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
        console.log('fetchProfessors -> json', json);
        console.log(
          'fetchProfessors -> todos los habilitados',
          json.subjectProfessors,
        );
        setProfessors(json.allProfessors);
        json.subjectProfessors.forEach((p) => {
          setSubjectProfessors([...subjectProfessors, p.id]);
        });
      });
    setLoading(false);
  };
  useEffect(() => {
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
    fetch('http://181.164.121.14:25565/subjects/modify', {
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
      <>
        <Text category="h5">TODOS Profesores</Text>

        {!loading &&
          professors.map((profe) => {
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
                // accessoryLeft={
                //   subjectProfessors.length > 0 &&
                //   subjectProfessors.includes(profe.id)
                //     ? StatusIcon
                //     : RemoveIcon
                // }
              >
                <Text>
                  {profe.name} {profe.surname}
                </Text>
              </Button>
            );
          })}

        <Text category="h5">AGREGADOS Profesores</Text>
        {subjectProfessors.map((profe) => {
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
              // accessoryLeft={
              //   subjectProfessors.length > 0 &&
              //   subjectProfessors.includes(profe.id)
              //     ? StatusIcon
              //     : RemoveIcon
              // }
            >
              <Text>
                {profe.name} {profe.surname}
              </Text>
            </Button>
          );
        })}

        <Button
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          onPress={handleConfirm}>
          Confirmar
        </Button>
      </>
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
