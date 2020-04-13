import React, { useContext, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Styles } from '../style/styles';
import { Context } from '../context/AuthContext';
import messaging from '@react-native-firebase/messaging';

async function registerAppWithFCM(setDeviceToken) {
  await messaging().registerDeviceForRemoteMessages();
  messaging()
    .getToken()
    .then((token) => {
      setDeviceToken(token);
    });
}

//TODO: formik
export const SignInScreen = ({ navigation }) => {
  const { signin } = useContext(Context);
  const [legajo, setLegajo] = useState(0);
  const [password, setPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  React.useEffect(() => {
    registerAppWithFCM(setDeviceToken);
  }, []);
  const { splashLogoStyle, inputView, inputText, loginText, loginBtn } = styles;
  const Logo = require('../assets/logo.png');
  const Background = require('../assets/background.jpg');
  const { loginFlowContainer } = Styles;
  return (
    <ImageBackground source={Background} style={loginFlowContainer}>
      <Image style={splashLogoStyle} source={Logo} />
      <View style={styles.inputView}>
        <TextInput
          style={inputText}
          placeholder="Legajo..."
          placeholderTextColor="#003f5c"
          onChangeText={setLegajo}
          autoCapitalize="none"
          keyboardType="numeric"
        />
      </View>
      <View style={inputView}>
        <TextInput
          secureTextEntry
          style={inputText}
          placeholder="Contraseña..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={loginBtn}
        onPress={() => signin({ legajo, password, deviceToken })}>
        <Text style={loginText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={loginText}>Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = {
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
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
  splashLogoStyle: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '130%',
  },
};
