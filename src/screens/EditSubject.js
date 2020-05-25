import React, { useEffect, useState } from 'react';
import { Text, Layout, Icon, Button } from '@ui-kitten/components';
import { isEmpty } from 'underscore';
import { getToken } from '../utils/authHelper';

export const EditSubject = () => {
  const [professors, setProfessors] = useState(null);
  useEffect(() => {
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
  }, []);
  return (
    <Layout level="1" style={style.layout}>
      <Text category="h5">Profesores Habilitados</Text>
      {!isEmpty(professors) &&
        professors.map((profe) => (
          <Button
            appearance="ghost"
            onPress={() => console.log('algo')}
            style={{
              justifyContent: 'flex-start',
              borderBottomColor: '#b0bec5',
              borderBottomWidth: 1,
              borderRadius: 0,
            }}
            accessoryLeft={StatusIcon}>
            <Text>{profe.name}</Text>
          </Button>
        ))}
    </Layout>
  );
};

const StatusIcon = (props) => {
  const statusColor = '#00C853';
  return <Icon {...props} name="checkmark-circle-outline" fill={statusColor} />;
};

const style = {
  layout: {
    flex: 1,
    padding: 15,
  },
};
