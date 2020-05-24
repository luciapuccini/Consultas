import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './context/ThemeContext';
import { Toggle, Icon } from '@ui-kitten/components';

import { Home, SignInScreen, SignUpScreen } from './screens';
import { Classes } from './screens/Classes';
import { Professor } from './screens/Professor';
import { Profile } from './screens/Profile';
import { Context } from './context/AuthContext';
import { ClassDetail } from './screens/ClassDetail';
import { ClassesManager } from './screens/ClassesManager';
import { ClassForm } from './screens/ClassForm';
import { SubjectForm } from './screens/SubjectForm';

export const RootStack = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const isDark = themeContext.theme !== 'light' ? true : false;
  const darkHeaderConfig = isDark
    ? {
        headerStyle: {
          backgroundColor: '#222b44',
        },
        headerTintColor: '#fff',
      }
    : null;
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <ProfileIcon />,
          headerLeft: () => <ThemeSwitch />,
          ...darkHeaderConfig,
        }}
      />
      <Screen
        name="Classes"
        component={Classes}
        options={{ ...darkHeaderConfig }}
      />
      <Screen
        name="Class Detail"
        component={ClassDetail}
        options={{ ...darkHeaderConfig }}
      />
      <Screen
        name="Classes Manager"
        component={ClassesManager}
        options={{ ...darkHeaderConfig }}
      />
      <Screen
        name="Professor"
        component={Professor}
        options={{ ...darkHeaderConfig }}
      />
      <Screen
        name="Add Class"
        component={ClassForm}
        options={{ ...darkHeaderConfig }}
      />
      <Screen
        name="Add Subject"
        component={SubjectForm}
        options={{ ...darkHeaderConfig }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => <LogOutIcon />,
          ...darkHeaderConfig,
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
      <Icon name="person" style={profileIconStyle} fill="#8F9BB3" />
    </TouchableOpacity>
  );
};
const LogOutIcon = () => {
  const { signout } = React.useContext(Context);
  const { profileIconStyle } = Styles;
  return (
    <TouchableOpacity onPress={() => signout()}>
      <Icon name="power" style={profileIconStyle} fill="#8F9BB3" />
    </TouchableOpacity>
  );
};

const ThemeSwitch = () => {
  const themeContext = React.useContext(ThemeContext);
  const checked = themeContext.theme !== 'light' ? true : false;
  return (
    <Toggle
      status="primary"
      checked={checked}
      onChange={themeContext.toggleTheme}
      style={Styles.toggleStyle}
    />
  );
};

const Styles = {
  profileIconStyle: { height: 30, width: 30, marginRight: 20 },
  toggleStyle: {
    marginLeft: 15,
  },
};
