import React, { useContext, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import _ from 'underscore';
import { Styles } from '../style/styles';
import { Context } from '../context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import { setIsFirstLogin } from '../utils/authHelper';

import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '@ui-kitten/components';

async function registerAppWithFCM(setDeviceToken) {
  await messaging().registerDeviceForRemoteMessages();
  messaging()
    .getToken()
    .then((token) => {
      setDeviceToken(token);
    });
}

export const SignInScreen = ({ navigation }) => {
  const { signin } = useContext(Context);
  const [legajo, setLegajo] = useState(0);
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const [deviceToken, setDeviceToken] = useState('');

  React.useEffect(() => {
    registerAppWithFCM(setDeviceToken);
  }, []);

  const handleSingIn = async () => {
    setloading(true);
    if (!_.isEmpty(legajo) && !_.isEmpty(password)) {
      const data = await signin({ legajo, password, deviceToken });
      if (data !== '') {
        setError(data);
        setloading(false);
      }
    } else {
      setError('Complete the fields');
      setTimeout(() => {
        setError(false);
        setloading(false);
      }, 3000);
    }
  };

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
      {!_.isEmpty(error) ? <ErrorMessage message={error} /> : null}
      <TouchableOpacity style={loginBtn} onPress={handleSingIn}>
        {loading ? (
          <Spinner status="basic" />
        ) : (
          <Text style={loginText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={loginText}>Registrarme</Text>
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
