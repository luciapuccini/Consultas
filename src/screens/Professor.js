import React, { useState } from 'react';
import { Alert, View, Linking, TouchableOpacity, FlatList } from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Layout,
  Menu,
  MenuItem,
  MenuGroup,
  Spinner,
  Icon,
} from '@ui-kitten/components';
import { Separator } from 'native-base';
import { getToken } from '../utils/authHelper';
import _ from 'underscore';
import { getHora } from '../utils/functions';

const chatImage = require('../assets/chat.png');
const placeHolder = require('../assets/rick.jpg');

export const Professor = ({ route }) => {
  const { professor } = route.params;
  const { id, name, mobile, surName, email, profileImagePath } = professor;
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [professorSubjects, setProfessorSubjects] = useState([]);
  const [professorClases, setProfessorClases] = useState([]);

  //WARNING error con las clases de cada subject
  const fetchProfessorSubjets = async () => {
    const token = await getToken();
    fetch(`http://181.164.121.14:25565/users/getProfessorSubjects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setProfessorSubjects(json);
        json.forEach((subject) => {
          fetchProfessorClases(subject.subjectId);
        });

        setLoading1(false);
      });
  };

  const fetchProfessorClases = async (subjectId) => {
    const token = await getToken();
    fetch(
      `http://181.164.121.14:25565/clases/findProfessorClasses?professorId=${id}&subjectId=${subjectId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        setProfessorClases(json);
        setLoading2(false);
      })
      .catch((error) => console.log(error));
  };

  const getSubjects = () => {
    let spreadedSubjects = [];
    professorSubjects.map((subject) => {
      let spreadedClases = [];
      professorClases.values.forEach((clase) => {
        const newClase = { date: clase.initTime, status: clase.status };
        spreadedClases.push(newClase);
      });
      const newSubject = { name: subject.name, classes: spreadedClases };
      spreadedSubjects.push(newSubject);
    });

    return spreadedSubjects;
  };

  React.useEffect(() => {
    // 1. fetch subjects ->
    // await subjects ->
    // fetch clases ->
    // armo todo
    fetchProfessorSubjets();
  }, []);

  const openChat = () => {
    const temp = professor.mobile || '3364637796';
    Linking.canOpenURL(`whatsapp://send?text=hola!`).then((res) => {
      if (res) {
        Linking.openURL(`whatsapp://send?text=hola!&phone=${temp}`);
      } else {
        Alert.alert(`Can't open Whatsapp, please Install de App`);
      }
    });
  };

  return (
    <Layout
      level="1"
      style={{
        flex: 1,
      }}>
      <Card status="basic" style={{ marginTop: 5, marginHorizontal: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            minHeight: 140,
          }}>
          <Avatar
            source={profileImagePath || placeHolder}
            style={{ height: 100, width: 100, alignSelf: 'center' }}
            shape="square"
          />
          <Details
            name={name}
            surName={surName}
            email={email}
            mobile={mobile}
            openChat={openChat}
          />
        </View>
      </Card>
      <Header title="Horarios De Consulta" />
      {!loading1 && !loading2 ? (
        <FlatList
          data={getSubjects()}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <SubjectItem subject={item} />}
        />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

const Details = ({ name, surName, email, mobile, openChat }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        marginLeft: 30,
        marginRight: -15,
        minHeight: 120,
        justifyContent: 'space-evenly',
      }}>
      <Text category="h5">
        {name}
        {surName || null}
      </Text>
      <Text category="s1">Email:</Text>
      <Text category="s1" appearance="hint">
        {email}
      </Text>

      {mobile ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => openChat()}>
            <Avatar source={chatImage} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const Header = ({ title }) => {
  return (
    <Layout
      level="2"
      style={{ paddingVertical: 10, width: '100%', alignItems: 'center' }}>
      <Text category="h5">{title}</Text>
    </Layout>
  );
};

const SubjectItem = ({ subject }) => {
  return (
    <Menu>
      <MenuGroup title={subject.name}>
        {subject.classes.map((clase) => {
          return (
            <MenuItem
              style={styles.row}
              title={getHora(clase.date)}
              accessoryLeft={() => <StatusIcon status={clase.status} />}
            />
          );
        })}
      </MenuGroup>
    </Menu>
  );
};

const StatusIcon = ({ status }) => {
  const isLive = status === 'En curso';
  const statusColor = !isLive ? '#FFCA28' : '#00C853';
  return (
    <Icon
      name="checkmark-circle-outline"
      style={styles.checkStyle}
      fill={statusColor}
    />
  );
};

const styles = {
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  space: { marginVertical: 14, marginHorizontal: 20 },
  cardStyle: {
    flexDirection: 'column',
    padding: 10,
  },
  textRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkStyle: { width: 15, height: 15, marginTop: 2 },
};
