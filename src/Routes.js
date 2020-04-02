import React from 'react';
import { Button, Image } from 'react-native';
import { Home } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Details } from './Details';
import { Settings } from './Settings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export const RootStack = ({ navigation }) => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
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
