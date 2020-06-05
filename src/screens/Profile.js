import React from 'react';
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
} from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';
import { EditPasswordModal } from '../components/EditPasswordModal';
import { ErrorMessage } from '../components/ErrorMessage';
import { getUserImage } from '../utils/functions';

export const Profile = ({ navigation }) => {
  const [showMobile, setShowMobile] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [onPasswordEdit, setOnPasswordEdit] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      try {
        const response = await fetch(
          `http://181.164.121.14:25565/users/getUser`,
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
    fetchUser();
  }, []);

  const isProfessor = user.role === 'ROLE_PROFESSOR';
  const isStudent = user.role === 'ROLE_STUDENT';

  const renderBrushIcon = (props) => (
    <TouchableWithoutFeedback onPress={() => console.log('pueod hacer esto')}>
      <Icon {...props} name="edit-2-outline" />
    </TouchableWithoutFeedback>
  );

  const save = () => {
    const handleSave = async () => {
      const token = await getToken();
      const userBody = { ...user, showMobile };
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
        console.log('handleSave -> json', json);
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
      //FIXME: si no es valido solo aviso
      if (!isValid) {
        setError('Error de formato de telefono');
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }

    handleSave();
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
          .then((val) => console.log('lnln', val))
          .catch((err) => console.log('catch', err));
      }
    });
  };

  const validatePhone = (num) => {
    const phoneRegex = /\+549\d\+{9}/;
    return num.match(phoneRegex);
  };
  //#region  IMAGES
  const profileBack = require('../assets/background-profile.png');
  const profilePlaceholder = require('../assets/profile_placeholder.png');
  const profileImage = user.profileImagePath
    ? getUserImage(user.userId)
    : profilePlaceholder;
  //#endregion
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
                source={profileImage}
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
              <>
                <Input
                  style={styles.inputStyle}
                  label="Telefono"
                  placeholder={user.mobile}
                  onChangeText={(text) => setUser({ ...user, mobile: text })}
                  value={user.mobile}
                  accessoryRight={renderBrushIcon}
                  keyboardType="phone-pad"
                  caption="+ 54 9 111 1111111"
                />
                {error && (
                  <View style={{ marginLeft: 10 }}>
                    <ErrorMessage message={error} />
                  </View>
                )}
                <CheckBox
                  style={{ marginLeft: 10, marginTop: 10 }}
                  checked={showMobile}
                  onChange={() => setShowMobile(!showMobile)}>
                  Mostar mi telefono publicamente
                </CheckBox>
              </>
            )}
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
};
