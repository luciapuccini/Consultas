import React from 'react';
import { ImageBackground, Image } from 'react-native';
import { View } from 'native-base';

const Logo = require('../assets/logo.png');
const Background = require('../assets/background.jpg');
const Splash = () => {
  return (
    <ImageBackground source={Background} style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.splashLogoStyle} source={Logo} />
      </View>
    </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  splashLogoStyle: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
};

export default Splash;
