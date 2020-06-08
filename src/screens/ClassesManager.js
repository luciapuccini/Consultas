import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Layout, Tab, TabView, Icon, Text } from '@ui-kitten/components';
import SimpleClassesList from '../components/SimpleClasessList';
import FixedClassesList from '../components/FixedClasessList';
import { getToken } from '../utils/authHelper';

export const ClassesManager = ({ route }) => {
  const { subject, manager } = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [simpleClasses, setSimpleClasses] = useState([]);
  const [regularClasses, setRegularClasses] = useState([]);

  const fetchClasses = async () => {
    const { subjectId } = subject;
    const token = await getToken();
    console.log('cosas');
    fetch(
      `http://181.164.121.14:25565/subjects/professorClasses/${subjectId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('fetchClasses -> json', json);
        filterClasses(json);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filterClasses = (clases) => {
    //FIXME: isRegular !!
    /* {
      'fecha' : 'sss',
      clases: [ ... ]  > 1 -> regulares
    }*/
    setRegularClasses(clases.filter((clase) => clase.isRegular));
    setSimpleClasses(clases.filter((clase) => !clase.isRegular));
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <TabView
        style={{ marginTop: 10, flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="Simples">
          <SimpleClassesList
            simpleClasses={simpleClasses}
            subject={subject}
            manager={manager}
            refresh={fetchClasses}
          />
        </Tab>
        <Tab title="Regulares">
          <FixedClassesList regularClasses={regularClasses} />
        </Tab>
      </TabView>
    </Layout>
  );
};
