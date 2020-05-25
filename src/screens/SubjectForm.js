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
  const [selected, setSelected] = useState(null);
  const [subjectProfessors, setSubjectProfessors] = useState([]);
  console.log('addSubject -> subjectProfessors', subjectProfessors);

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
    if (subjectProfessors.includes(profe.id)) {
      //pertenece
      const removedSubject = subjectProfessors.filter((p) => profe.id !== p);
      setSubjectProfessors([...removedSubject]);
    } else {
      //agregalo
      setSelected(profe.id);
      setSubjectProfessors([...subjectProfessors, profe.id]);
    }
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
          <Button
            appearance="ghost"
            onPress={() => {
              addProfeToList(profe);
            }}
            style={{
              justifyContent: 'flex-start',
              borderBottomColor: '#b0bec5',
              borderBottomWidth: 1,
              borderRadius: 0,
            }}
            accessoryLeft={subjectProfessors.includes(profe.id) && StatusIcon}>
            <Text>{profe.name}</Text>
          </Button>
        ))}
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Button
          appearance="outline"
          onPress={openGallery}
          accessoryRight={CameraIcon}>
          Subir Foto
        </Button>
        <Button appearance="primary" onPress={addSubject} disabled={disabled}>
          Confirmar
        </Button>
      </View>
    </Layout>
  );
};

const StatusIcon = (props) => {
  const statusColor = '#00C853';
  return <Icon {...props} name="checkmark-circle-outline" fill={statusColor} />;
};
const CameraIcon = (props) => {
  return <Icon {...props} name="camera-outline" />;
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
  checkStyle: {
    height: 20,
    backgroundColor: 'red',
    // alignSelf: 'flex-end',
  },
});
