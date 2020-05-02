import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import _ from 'underscore';
import { Styles } from '../style/styles';
import { Context } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
const { loginFlowContainer } = Styles;

export const SignUpScreen = ({ navigation }) => {
  const Background = require('../assets/background.jpg');
  const { inputText, inputView, loginBtn, loginText } = styles;
  const { signup } = React.useContext(Context);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [legajo, setLegajo] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSingUp = async () => {
    const user = { legajo, name, email, password };
    const hasUser =
      !_.isEmpty(legajo) &&
      !_.isEmpty(name) &&
      !_.isEmpty(email) &&
      !_.isEmpty(password);
    if (hasUser) {
      const data = await signup(user);
      console.log('a ver que pasa', data);
      setError(data);
    } else {
      setError('Complete the fields');
    }
  };
  return (
    <ImageBackground source={Background} style={loginFlowContainer}>
      <Text style={{ color: 'white', fontSize: 30, marginBottom: 20 }}>
        Create an Account
      </Text>

      <View style={[inputView]}>
        <TextInput
          secureTextEntry
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
          placeholder="Nombre Completo..."
          placeholderTextColor="#003f5c"
          onChangeText={setName}
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

      <View style={inputView}>
        <TextInput
          secureTextEntry
          style={inputText}
          placeholder="Contraseña..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
        />
      </View>

      {!_.isEmpty(error) ? <ErrorMessage message={error} /> : null}

      <TouchableOpacity style={loginBtn} onPress={handleSingUp}>
        <Text style={loginText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={loginText}>Already a User?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

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
  forgot: {
    color: 'white',
    fontSize: 18,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#4570e6',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
