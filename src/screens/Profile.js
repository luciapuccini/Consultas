import React from 'react';
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
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

const userPlaceholderImage = require('../assets/rick.jpg');
export const Profile = ({ navigation }) => {
  const [hasEdited, setHasEdited] = React.useState(false);
  const [showMobile, setShowMobile] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [onPasswordEdit, setOnPasswordEdit] = React.useState(false);
  const [inscripciones, setInscripciones] = React.useState(null);

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
          books,
          id,
          surname,
          mobile,
          showMobile,
        } = json;
        //FIXME: porqueee?
        setUser({
          name,
          email,
          legajo,
          userId: id,
          surname,
          mobile,
        });
        setShowMobile(showMobile);
        setInscripciones(books);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

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
        console.log('response', json);
      } catch (error) {
        console.log(error);
      }
    };

    handleSave();
    const isValid = validatePhone(user.mobile);
    if (isValid) {
      //FIXME: in this case save
    } else {
      setError('Wrong number format');
    }
  };

  const handleImage = async () => {
    const token = await getToken();
    const options = {
      title: 'Subir Foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let imageFile;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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
          .then((val) => console.log('response', val))
          .catch((err) => console.log('catch', err));
      }
    });
  };

  const validatePhone = (num) => {
    const phoneRegex = /\+549\d\+{9}/;
    return num.match(phoneRegex);
  };
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!loading ? (
        <>
          <ImageBackground style={styles.loginFlowContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri: `http://181.164.121.14:25565/users/images/profileImages/${user.userId}`,
                }}
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
                {user.name}
                {user.surname}
              </Text>
              {hasEdited && <ConfirmButton save={save} />}
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
              onKeyPress={() => setHasEdited(true)}
              value={user.name}
              accessoryRight={renderBrushIcon}
            />
            <Input
              style={styles.inputStyle}
              label="Apellido"
              placeholder={user.surname}
              onChangeText={(value) => setUser({ ...user, surname: value })}
              onKeyPress={() => setHasEdited(true)}
              value={user.surname}
              accessoryRight={renderBrushIcon}
            />
            <Input
              style={styles.inputStyle}
              label="Email"
              placeholder={user.email}
              onChangeText={(value) => setUser({ ...user, email: value })}
              onKeyPress={() => setHasEdited(true)}
              value={user.email}
              accessoryRight={renderBrushIcon}
            />
            <Input
              style={styles.inputStyle}
              label="Telefono"
              placeholder={user.mobile}
              onChangeText={(text) => setUser({ ...user, mobile: text })}
              onKeyPress={() => setHasEdited(true)}
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
                Edit Password
              </Button>
              <EditPasswordModal
                visible={onPasswordEdit}
                setVisible={setOnPasswordEdit}
              />

              <Button
                appearance="ghost"
                onPress={() =>
                  navigation.navigate('Classes', { bookings: inscripciones })
                }>
                Mis Inscripciones
              </Button>
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
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={save}
        style={{
          backgroundColor: '#00C853',
          borderRadius: 20,
          width: '45%',
        }}>
        <Icon
          name="checkmark-circle-outline"
          fill="white"
          style={{
            height: 30,
            width: 30,
            padding: 5,
          }}
        />
      </TouchableOpacity>
      <Text style={{ color: '#00C853' }}>Confirmar</Text>
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
    backgroundColor: '#3949ab',
    maxHeight: 150,
  },
};
