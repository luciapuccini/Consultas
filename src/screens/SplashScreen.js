import React from 'react';
import { View, Image } from 'react-native';

const Logo = require('../assets/logo.png');

export const SplashScreen = () => {
  const { backgroundViewStyle, splashLogoStyle } = styles;

  return (
    <View style={backgroundViewStyle}>
      <Image style={splashLogoStyle} source={Logo} />
    </View>
  );
};

const styles = {
  backgroundViewStyle: {
    flex: 1,
    backgroundColor: '#8abce6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogoStyle: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
};
