import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import _ from 'underscore';
import { Styles } from '../style/styles';
import { Context } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const { loginFlowContainer } = Styles;

export const SignUpScreen = ({ navigation }) => {
  const Background = require('../assets/background.jpg');
  const { inputText, inputView, loginBtn, loginText } = styles;
  const { signup } = React.useContext(Context);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [legajo, setLegajo] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSingUp = async () => {
    const user = { legajo, name, surname, email, password };
    const hasUser =
      !_.isEmpty(legajo) &&
      !_.isEmpty(name) &&
      !_.isEmpty(email) &&
      !_.isEmpty(password);
    if (hasUser) {
      const data = await signup(user);
      setError(data);
      navigation.goBack();
    } else {
      setError('Complete los campos');
    }
  };
  return (
    <ImageBackground source={Background} style={{ flex: 1, width: '100%' }}>
      <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            height: '100%',
            flex: 1,
          }}>
          <Text style={{ color: 'white', fontSize: 30, marginBottom: 20 }}>
            Crear una Cuenta
          </Text>

          <View style={[inputView]}>
            <TextInput
              style={inputText}
              placeholder="Legajo..."
              placeholderTextColor="#003f5c"
              onChangeText={setLegajo}
              keyboardType="numeric"
            />
          </View>

          <View style={[inputView]}>
            <TextInput
              style={inputText}
              placeholder="Nombre..."
              placeholderTextColor="#003f5c"
              onChangeText={setName}
            />
          </View>
          <View style={[inputView]}>
            <TextInput
              style={inputText}
              placeholder="Apellido..."
              placeholderTextColor="#003f5c"
              onChangeText={setSurname}
            />
          </View>
          <View style={[inputView]}>
            <TextInput
              style={inputText}
              placeholder="Mail..."
              placeholderTextColor="#003f5c"
              onChangeText={setEmail}
            />
          </View>
          {/* TODO: passwords match */}
          <View style={inputView}>
            <TextInput
              secureTextEntry
              style={inputText}
              placeholder="Contraseña..."
              placeholderTextColor="#003f5c"
              onChangeText={setPassword}
            />
          </View>
          <View style={inputView}>
            <TextInput
              secureTextEntry
              style={inputText}
              placeholder="Confirme Contraseña..."
              placeholderTextColor="#003f5c"
              onChangeText={setPassword}
            />
          </View>

          {!_.isEmpty(error) ? <ErrorMessage message={error} /> : null}

          <View style={styles.rowBox}>
            <TouchableOpacity style={loginBtn} onPress={handleSingUp}>
              <Text style={loginText}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={loginText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
//FIXME: delete unused & merge inline stt
const styles = {
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  signInBtn: {},
  loginBtn: {
    width: '40%',
    backgroundColor: '#4570e6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  loginText: {
    fontSize: 20,
    color: 'white',
  },
  rowBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
  },
  labelStyle: {
    color: 'white',
    fontSize: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
};
