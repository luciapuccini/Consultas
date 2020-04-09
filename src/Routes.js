import React from 'react';
import { Home, SignInScreen, SignUpScreen } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Details } from './Details';
import { Profile } from './Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Context } from './context/AuthContext';

export const RootStack = ({ navigation }) => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <ProfileIcon />,
        }}
      />
      <Screen name="Details" component={Details} />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => <LogOutIcon />,
        }}
      />
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

const ProfileIcon = () => {
  const navigation = useNavigation();
  const { profileIconStyle } = Styles;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Icon active name="ios-person" style={profileIconStyle} />
    </TouchableOpacity>
  );
};
const LogOutIcon = () => {
  const { signout } = React.useContext(Context);
  const { profileIconStyle } = Styles;
  return (
    <TouchableOpacity onPress={() => signout()}>
      <Icon active name="ios-power" style={profileIconStyle} />
    </TouchableOpacity>
  );
};

const Styles = {
  profileIconStyle: { fontSize: 30, marginRight: 20, color: '#a9a9a9' },
};
