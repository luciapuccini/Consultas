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
  IndexPath,
} from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';
import { EditPasswordModal } from '../components/EditPasswordModal';
import { ErrorMessage } from '../components/ErrorMessage';
import { getUserImage } from '../utils/functions';
import { SERVER_URL } from '../utils/config';

const profileBack = require('../assets/background-profile.png');
const profilePlaceholder = require('../assets/profile_placeholder.png');

export const Profile = ({ navigation }) => {
  const [showMobile, setShowMobile] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [onPasswordEdit, setOnPasswordEdit] = useState(false);
  const [imageSrc, setImageSrc] = useState(profilePlaceholder);
  const [imgFlag, setImgFlag] = useState(user.profileImagePath);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      try {
        const response = await fetch(`${SERVER_URL}/users/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
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
    const profileImage = imgFlag
      ? { uri: getUserImage(user.userId) + `?${Math.random()}` } //FIXME: RN BUG, ONLY WAY TO SOLVE FOR NOW
      : profilePlaceholder;
    setImageSrc(profileImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, imgFlag]);

  useEffect(() => {
    setImgFlag(user.profileImagePath);
  }, [user]);

  const save = () => {
    const handleSave = async () => {
      const token = await getToken();
      // const prefix = '+549';

      const userBody = {
        ...user,
        mobile: (user.mobile),
        showMobile,
      };
      try {
        const response = await fetch(`${SERVER_URL}/users/modify`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userBody),
        });
        const json = await response.json();
        if (json.error) {
          setError(json.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSave();

    if (user.mobile) {
        navigation.navigate('Home');
    } else {
      navigation.goBack();
    }
  };

  const handleImage = async () => {
    const token = await getToken();
    const options = {
      title: 'Subir Foto',
      takePhotoButtonTitle: "Abrir Camara.",
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

        fetch(`${SERVER_URL}/users/images/upload`, {
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
              setImgFlag(fileName);
            }
          })
          .catch((err) => console.log('catch', err));
      }
    });
  };

  const validatePhone = (num) => {
    const enable = parseInt(num) && num.length >= 7;
    
    return enable;
  };

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
            <PhoneRow
              user={user}
              setUser={setUser}
              showMobile={showMobile}
              setShowMobile={setShowMobile}
            />
            {error && error !== 'Succed' && <ErrorMessage message={error} />}
            <CheckBox
                  style={{ marginLeft: 10, marginTop: 10 }}
                  checked={showMobile}
                  onChange={() => setShowMobile(!showMobile)}>
                  Mostar mi telefono publicamente
                </CheckBox>
                
            <View style={styles.editPassword}>
              <Button
                style={styles.button}
                appearance="outline"
                status="primary"
                onPress={() => setOnPasswordEdit(true)}>
                Editar Contraseña
              </Button>
              <EditPasswordModal
                visible={onPasswordEdit}
                setVisible={setOnPasswordEdit}
              />
            <ConfirmButton save={save} />

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
    <View style={styles.confirmBtn}>
      <Button status="success" onPress={save}>
        Aceptar
      </Button>
    </View>
  );
};

const PhoneRow = ({ user, setUser, showMobile, setShowMobile }) => {
  const phone =  user.mobile;

  return (
    <View style={{ flex: 1 }}>
      <Input
        style={styles.inputStyle}
        label="Telefono"
        placeholder={user.mobile || '+ 54 9 341 000 0000'}
        onChangeText={(text) => setUser({ ...user, mobile: text })}
        value={phone}
        accessoryRight={renderBrushIcon}
        keyboardType="phone-pad"
        caption="Comparte tu telefono con los demás usuarios"
      />
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
  confirmBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  editPassword: {
    margin: 10,
    paddingTop:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
