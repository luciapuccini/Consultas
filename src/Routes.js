import React from 'react';
import { Image } from 'react-native';
import { Home, SignInScreen, SignUpScreen } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Details } from './Details';
import { Settings } from './Settings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export const RootStack = ({ navigation }) => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <SettingsIcon />,
        }}
      />
      <Screen name="Details" component={Details} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
};

export const AuthStack = ({ navigation }) => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName="SignIn">
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
      />
    </Navigator>
  );
};

const SettingsIcon = () => {
  const navigation = useNavigation();
  const Icon = require('../src/assets/settingsIcon.png');
  const { settingsIconStyle } = Styles;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Image source={Icon} style={settingsIconStyle} />
    </TouchableOpacity>
  );
};

const Styles = {
  settingsIconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 20,
  },
};
