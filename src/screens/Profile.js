import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Fab } from 'native-base';
import {
  Input,
  Icon,
  Text,
  Divider,
  Button,
  Layout,
  CheckBox,
  Spinner,
} from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';
import { EditPasswordModal } from '../components/EditPasswordModal';
import { ErrorMessage } from '../components/ErrorMessage';
import { getUserImage } from '../utils/functions';

export const Profile = ({ navigation }) => {
  const [showMobile, setShowMobile] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [onPasswordEdit, setOnPasswordEdit] = useState(false);
  const [imageSrc, setImageSrc] = useState(profilePlaceholder);
  const [imgFlag, setImgFlag] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      try {
        const response = await fetch(
          'http://181.164.121.14:25565/users/getUser',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await response.json();
        const {
          name,
          email,
          legajo,
          id,
          surname,
          mobile,
          showMobile,
          role,
          profileImagePath,
        } = json;
        setUser({
          name,
          email,
          legajo,
          userId: id,
          surname,
          mobile,
          role,
          profileImagePath,
        });
        setShowMobile(showMobile);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(true);
    fetchUser();
  }, []);

  useEffect(() => {
    const profileImage = user.profileImagePath
      ? { uri: getUserImage(user.userId) + `?${Math.random()}` } //FIXME: RN BUG, ONLY WAY TO SOLVE FOR NOW
      : profilePlaceholder;
    setImageSrc(profileImage);
  }, [loading, imgFlag]);

  const isProfessor = user.role === 'ROLE_PROFESSOR';
  const isStudent = user.role === 'ROLE_STUDENT';

  const save = () => {
    const handleSave = async () => {
      const token = await getToken();
      const prefix = '+549';

      const userBody = {
        ...user,
        mobile: prefix.concat(user.mobile),
        showMobile,
      };
      try {
        const response = await fetch(
          'http://181.164.121.14:25565/users/modify',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userBody),
          },
        );
        const json = await response.json();
        if (json.error) {
          setError(json.message);
        }
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    };

    if (isProfessor && user.mobile) {
      const isValid = validatePhone(user.mobile);
      if (!isValid) {
        setError('Error de formato de telefono');
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else {
        handleSave();
      }
    }
  };

  const handleImage = async () => {
    const token = await getToken();
    const options = {
      title: 'Subir Foto',
      takePhotoButtonTitle: 'Usar camara...',
      chooseFromLibraryButtonTitle: 'Elegir foto de galeria...',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let imageFile;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('[ CANCELED ]');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const { type, data, fileName } = response;
        imageFile = { imageType: type, base64Image: data, fileName };

        fetch('http://181.164.121.14:25565/users/images/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(imageFile),
        })
          .then((resp) => resp.json())
          .then((val) => {
            if (val.message == 'Succed') {
              setImgFlag(true);
            }
          })
          .catch((err) => console.log('catch', err));
      }
    });
  };

  const validatePhone = (num) => {
    const enable = Number.isInteger(parseInt(num)) && num.length >= 7;
    return enable;
  };
  const profileBack = require('../assets/background-profile.png');
  const profilePlaceholder = require('../assets/profile_placeholder.png');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!loading ? (
        <>
          <ImageBackground
            style={styles.loginFlowContainer}
            source={profileBack}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                source={imageSrc}
                style={{ height: 100, width: 100, borderRadius: 50 }}
              />

              <Fab
                containerStyle={{ marginLeft: 20 }}
                style={{
                  backgroundColor: '#5067FF',
                  height: 40,
                  width: 40,
                }}
                position="bottomLeft"
                onPress={handleImage}>
                <Icon
                  name="camera"
                  fill="white"
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
              </Fab>
            </View>
          </ImageBackground>

          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 10,
                flexDirection: 'row',
              }}>
              <Text category="h3">
                {user.name} {user.surname}
              </Text>
            </View>
            <View style={{ margin: 10 }}>
              <Text
                category="h6"
                appearance="hint"
                style={{ paddingBottom: 5 }}>
                Legajo: {user.legajo}
              </Text>
              <Divider style={{ backgroundColor: '#b0bec5' }} />
            </View>

            <Input
              style={styles.inputStyle}
              label="Nombre"
              placeholder={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
              value={user.name}
              accessoryRight={renderBrushIcon}
            />
            <Input
              style={styles.inputStyle}
              label="Apellido"
              placeholder={user.surname}
              onChangeText={(value) => setUser({ ...user, surname: value })}
              value={user.surname}
              accessoryRight={renderBrushIcon}
            />
            <Input
              style={styles.inputStyle}
              label="Email"
              placeholder={user.email}
              onChangeText={(value) => setUser({ ...user, email: value })}
              value={user.email}
              accessoryRight={renderBrushIcon}
            />
            {isProfessor && (
              <PhoneRow
                user={user}
                setUser={setUser}
                showMobile={showMobile}
                setShowMobile={setShowMobile}
              />
            )}
            {error && error !== 'Succed' && <ErrorMessage message={error} />}
            <ConfirmButton save={save} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Button
                style={styles.button}
                appearance="ghost"
                status="primary"
                onPress={() => setOnPasswordEdit(true)}>
                Editar Contraseña
              </Button>
              <EditPasswordModal
                visible={onPasswordEdit}
                setVisible={setOnPasswordEdit}
              />

              {isStudent && (
                <Button
                  appearance="ghost"
                  onPress={() =>
                    navigation.navigate('Classes', {
                      studentSubscriptions: true,
                    })
                  }>
                  Mis Inscripciones
                </Button>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
          <CustomSpinner />
        )}
    </Layout>
  );
};
const renderBrushIcon = (props) => (
  <TouchableWithoutFeedback>
    <Icon {...props} name="edit-2-outline" />
  </TouchableWithoutFeedback>
);
const ConfirmButton = ({ save }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
      }}>
      <Button status="success" onPress={save}>
        Aceptar
      </Button>
    </View>
  );
};
const PhoneRow = ({ user, setUser, showMobile, setShowMobile }) => {
  const phone = user.mobile?.startsWith('+')
    ? user.mobile.slice(8)
    : user.mobile;

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.inputStyle, styles.phoneRow]}>
        <Input disabled label="Prefijo" value="+ 54 9" />
        <Input
          style={styles.phoneStyle}
          label="Telefono"
          placeholder={user.mobile}
          onChangeText={(text) => setUser({ ...user, mobile: text })}
          value={phone}
          accessoryRight={renderBrushIcon}
          keyboardType="phone-pad"
          caption="341 1234567"
        />
      </View>
      <CheckBox
        style={{ marginLeft: 10, marginTop: 10 }}
        checked={showMobile}
        onChange={() => setShowMobile(!showMobile)}>
        Mostrar mi telefono publicamente
      </CheckBox>
    </View>
  );
};

const styles = {
  inputStyle: {
    marginHorizontal: 10,
  },
  loginFlowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 150,
  },
  phoneRow: {
    width: '100%',
    flexDirection: 'row',
  },
  phoneStyle: {
    flex: 1,
    marginRight: 20,
    marginLeft: 10,
  },
};
