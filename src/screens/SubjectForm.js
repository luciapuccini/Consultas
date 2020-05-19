import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Button,
  Text,
  Input,
  Icon,
  Layout,
  CheckBox,
  Divider,
} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getToken } from '../utils/authHelper';
import ErrorMessage from '../components/ErrorMessage';
import { getHora, getFecha } from '../utils/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { isEmpty } from 'underscore';

export const SubjectForm = ({ route }) => {
  const { professors } = route.params;
  const [name, setName] = useState(null);
  const [image, setImage] = useState();
  const [subjectProfessors, setSubjectProfessors] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  console.log('a ver los profes', professors);
  // useEffect(() => {}, [professors]);
  const addSubject = async () => {
    const body = {
      name,
      subjectProfessors,
    };

    const formData = new FormData();
    formData.append('subject', JSON.stringify(body));
    formData.append('imageFile', image);
    const token = await getToken();
    fetch(`http://181.164.121.14:25565/subject/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('ADD?', json);
      })
      .catch((error) => console.log(error));
  };

  const addProfeToList = (profe) => {
    setSubjectProfessors([...subjectProfessors, profe.id]);
  };

  return (
    <Layout level="1" style={styles.layout}>
      <Input label="Nombre" onChangeText={setName} value={name} />
      <Text style={styles.space} category="h5">
        Habilitar Profesores
      </Text>
      {!isEmpty(professors) &&
        professors.map((profe) => (
          <View style={styles.space}>
            <TouchableOpacity
              onPress={() => {
                addProfeToList(profe);
              }}>
              <Text category="s1">{profe.name}</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        ))}
      <Button appearance="primary" onPress={openGallery}>
        Subir Foto
      </Button>
      <Button appearance="primary" onPress={addSubject} style={styles.space}>
        Confirmar
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 15,
  },
  space: {
    marginVertical: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

const CalenderIcon = (props) => (
  <Icon {...props} style={styles.pickerStyle} fill="#4169E1" name="calendar" />
);
