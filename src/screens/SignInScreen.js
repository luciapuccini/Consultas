import * as React from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { AppConsumer } from '../../App';

export const SignInScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {
    container,
    splashLogoStyle,
    inputView,
    inputText,
    forgot,
    loginText,
    loginBtn,
  } = styles;
  const Logo = require('../assets/logo.png');
  const Background = require('../assets/background.jpg');

  return (
    <ImageBackground source={Background} style={container}>
      <Image style={splashLogoStyle} source={Logo} />
      <View style={styles.inputView}>
        <TextInput
          style={inputText}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)}
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
      <TouchableOpacity>
        <Text style={forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <AppConsumer>
        {context => (
          <TouchableOpacity
            style={loginBtn}
            onPress={() => context.signIn({ username, password })}>
            <Text style={loginText}>LogIn</Text>
          </TouchableOpacity>
        )}
      </AppConsumer>
      <TouchableOpacity>
        <Text style={loginText}>Signup</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    color: 'white',
  },
  splashLogoStyle: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
};
