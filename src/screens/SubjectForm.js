import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Input, Icon, Layout } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import { isEmpty } from 'underscore';

import { getToken } from '../utils/authHelper';
import { ErrorMessage } from '../components/ErrorMessage';
import { SERVER_URL } from '../utils/config';

export const SubjectForm = ({ route, navigation }) => {
  const { professors, refresh } = route.params;

  const [name, setName] = useState(null);
  const [image, setImage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [subjectProfessors, setSubjectProfessors] = useState([]);
  const [error, setError] = useState(null);

  const addSubject = async () => {
    setDisabled(true);

    if (!isEmpty(name) && subjectProfessors.length > 0) {
      const body = {
        name,
        subjectProfessors,
      };
      const formData = new FormData();
      formData.append('subject', JSON.stringify(body));
      formData.append('imageFile', JSON.stringify(image));

      const token = await getToken();
      fetch(`${SERVER_URL}/subjects/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            setError(json.message);
            setTimeout(() => {
              setError(false);
            }, 3000);
          } else {
            refresh();
            navigation.goBack();
          }
          setDisabled(false);
        });
    } else {
      setDisabled(false);
      setError('Completa todos los campos');
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const addProfeToList = (profe) => {
    if (subjectProfessors.includes(profe.id)) {
      //pertenece
      const removedSubject = subjectProfessors.filter((p) => profe.id !== p);
      setSubjectProfessors([...removedSubject]);
    } else {
      //agregalo
      setSubjectProfessors([...subjectProfessors, profe.id]);
    }
  };
  const openGallery = () => {
    const options = {
      title: 'Buscar Foto',
      takePhotoButtonTitle: 'Usar camara...',
      chooseFromLibraryButtonTitle: 'Elegir foto de galeria...',
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
      <ScrollView>
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
              accessoryLeft={
                subjectProfessors.includes(profe.id) && StatusIcon
              }>
              <Text>
                {profe.name} {profe.surname}
              </Text>
            </Button>
          ))}
      </ScrollView>

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

      {error && <ErrorMessage message={error} />}
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
