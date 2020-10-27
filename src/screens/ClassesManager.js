import React, { useEffect, useState } from 'react';
import { mapObject } from 'underscore';
import { Layout, Tab, TabView } from '@ui-kitten/components';
import SimpleClassesList from '../components/SimpleClasessList';
import FixedClassesList from '../components/FixedClasessList';
import { getToken } from '../utils/authHelper';
import moment from 'moment';
import { SERVER_URL } from '../utils/config';

export const ClassesManager = ({ route }) => {
  const { subject, manager } = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [simpleClasses, setSimpleClasses] = useState([]);
  const [regularClasses, setRegularClasses] = useState([]);

  const fetchClasses = async () => {
    const { subjectId } = subject;
    const token = await getToken();
    fetch(`${SERVER_URL}/subjects/professorClasses/${subjectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        filterClasses(json);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filterClasses = (clases) => {
    const reg = [];
    const simp = [];
    mapObject(clases, (val, key) => {
      if (val.length > 1) {
        reg.push(val);
      } else {
        simp.push(val[0]);
      }
    });
    setRegularClasses(reg);
    setSimpleClasses(
      simp.sort((objA, objB) => moment(objA.initTime) - moment(objB.initTime)),
    );
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
          <FixedClassesList
            regularClasses={regularClasses}
            manager={manager}
            subject={subject}
            refresh={fetchClasses}
          />
        </Tab>
      </TabView>
    </Layout>
  );
};
