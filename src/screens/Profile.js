import React from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Fab, Thumbnail, Content, H1 } from 'native-base';
import { Input, Icon, Text, Divider, Button } from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';

const userPlaceholderImage = require('../assets/rick.jpg');
export const Profile = ({ navigation }) => {
  const [hasEdited, setHasEdited] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [passwordPresent, setPasswordPresent] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      try {
        //FIXME:'http://181.164.121.14:25565/users/id (????',
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
        setUser(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const renderBrushIcon = (props) => (
    <TouchableWithoutFeedback>
      <Icon {...props} name="edit-2-outline" />
    </TouchableWithoutFeedback>
  );

  const save = () => {
    const handleSave = async () => {
      const token = await getToken();
      /*{
        WARNING: manda basura de mas
        password:'',
        newPassword:'',
      }*/
      console.log('SAVE', token, user);
      try {
        //'http://181.164.121.14:25565/users/modify',
        const response = await fetch(
          'http://181.164.121.14:25565/users/modify',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
          },
        );
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    handleSave();
    console.log('save');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading ? (
        <>
          <ImageBackground style={styles.loginFlowContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Thumbnail
                source={userPlaceholderImage}
                style={{ height: 100, width: 100, borderRadius: 50 }}
              />

              <Fab
                active={photo}
                containerStyle={{ marginLeft: 20 }}
                style={{
                  backgroundColor: '#5067FF',
                  height: 40,
                  width: 40,
                }}
                position="bottomLeft"
                onPress={() => setPhoto(!photo)}>
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

          <Content>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 10,
                flexDirection: 'row',
              }}>
              <H1>{user.name}'s Profile</H1>
              {hasEdited ? <ConfirmButton save={save} /> : null}
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
              style={[styles.inputStyle, { marginBottom: 10 }]}
              label="Password"
              status={passwordPresent ? null : 'danger'}
              secureTextEntry
              caption={passwordPresent ? null : 'Required!'}
              placeholder="Password ..."
              onChangeText={(value) => setUser({ ...user, password: value })}
              onKeyPress={() => {
                setHasEdited(true), setPasswordPresent(true);
              }}
              value={user.password}
              accessoryRight={renderBrushIcon}
            />
            <Input
              style={styles.inputStyle}
              label="New Password"
              secureTextEntry
              placeholder="New password"
              onChangeText={(value) => setUser({ ...user, newPassword: value })}
              onKeyPress={() => setHasEdited(true)}
              value={user.newPassword}
              accessoryRight={renderBrushIcon}
            />
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
              label="Email"
              placeholder={user.email}
              onChangeText={(value) => setUser({ ...user, email: value })}
              onKeyPress={() => setHasEdited(true)}
              value={user.email}
              accessoryRight={renderBrushIcon}
            />

            <Button
              appearance="outline"
              style={{
                width: '50%',
                alignSelf: 'flex-end',
                marginRight: 10,
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('Classes')}>
              Mis Inscripciones
            </Button>
          </Content>
        </>
      ) : (
        <CustomSpinner />
      )}
    </SafeAreaView>
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
        style={{ backgroundColor: '#00C853', borderRadius: 20, width: '60%' }}>
        <Icon
          name="checkmark-circle-outline"
          fill="white"
          style={{
            height: 40,
            width: 40,
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
