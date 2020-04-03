import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Styles } from '../style/styles';
import { AppConsumer } from '../../App';

export const SignUpScreen = () => {
  const Background = require('../assets/background.jpg');
  const { inputText, inputView, loginBtn, loginText } = styles;
  const { loginFlowContainer } = Styles;
  //TODO: FORM

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [legajo, setLegajo] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <ImageBackground source={Background} style={loginFlowContainer}>
      <View style={inputView}>
        <TextInput
          style={inputText}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={setLegajo}
        />
      </View>
      <View style={inputView}>
        <TextInput
          secureTextEntry
          style={inputText}
          placeholder="Phone..."
          placeholderTextColor="#003f5c"
          onChangeText={setPhone}
        />
      </View>
      <View style={inputView}>
        <TextInput
          secureTextEntry
          style={inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
        />
      </View>
      <View style={inputView}>
        <TextInput
          secureTextEntry
          style={inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setConfirmPassword}
        />
      </View>
      <AppConsumer>
        {context => (
          <TouchableOpacity
            style={loginBtn}
            onPress={() => context.signIn({ legajo, password })}>
            <Text style={loginText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </AppConsumer>
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
};
