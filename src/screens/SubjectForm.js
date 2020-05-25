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
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

import { isEmpty } from 'underscore';

export const SubjectForm = ({ route }) => {
  const { professors } = route.params;
  const [name, setName] = useState(null);
  const [image, setImage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [subjectProfessors, setSubjectProfessors] = useState([]);

  const addSubject = async () => {
    setDisabled(true);
    const body = {
      name,
      subjectProfessors,
    };

    const formData = new FormData();
    formData.append('subject', JSON.stringify(body));
    formData.append('imageFile', JSON.stringify(image));

    const token = await getToken();
    fetch(`http://181.164.121.14:25565/subjects/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('ADD?', json);
        setDisabled(false);
      })
      .catch((error) => console.log(error));
  };

  const addProfeToList = (profe) => {
    setSubjectProfessors([...subjectProfessors, profe.id]);
  };
  const openGallery = () => {
    const options = {
      title: 'Buscar Foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const { type, data, fileName } = response;
        const imageResp = { imageType: type, base64Image: data, fileName };
        setImage(imageResp);
      }
    });
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
      <Button
        appearance="primary"
        onPress={addSubject}
        style={styles.space}
        disabled={disabled}>
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
    marginVertical: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

const CalenderIcon = (props) => (
  <Icon {...props} style={styles.pickerStyle} fill="#4169E1" name="calendar" />
);
