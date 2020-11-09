import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';
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
import { EditSubject } from './screens/EditSubject';
import { AddProfessor } from './screens/AddProfessor';
import { TutorialStack } from './screens/Tutorial';

import { getIsFirstLogin } from './utils/authHelper';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const RootStack = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator mode="modal">
      <Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Screen
        name="TutorialStack"
        component={TutorialStack}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
const MainStack = () => {
  const themeContext = React.useContext(ThemeContext);
  const { Navigator, Screen } = createStackNavigator();
  const isDark = themeContext.theme !== 'light' ? true : false;
  const darkHeaderConfig = isDark
    ? {
        headerStyle: {
          backgroundColor: '#222b44',
        },
        headerTintColor: '#fff',
      }
    : null;
  return (
    <Navigator initialRouteName={'Home'}>
      <Screen
        name="Home"
        component={Home}
        options={{
          title: 'Inicio',
          headerRight: () => <ProfileIcon />,
          ...darkHeaderConfig,
        }}
      />

      <Screen
        name="Classes"
        component={Classes}
        options={{ ...darkHeaderConfig, title: 'Clases' }}
      />
      <Screen
        name="Class Detail"
        component={ClassDetail}
        options={{ ...darkHeaderConfig, title: 'Detalles de Clase' }}
      />
      <Screen
        name="Classes Manager"
        component={ClassesManager}
        options={{ ...darkHeaderConfig, title: 'Administrar' }}
      />
      <Screen
        name="Professor"
        component={Professor}
        options={{ ...darkHeaderConfig, title: 'Profesor' }}
      />
      <Screen
        name="Add Class"
        component={ClassForm}
        options={{ ...darkHeaderConfig, title: 'Nueva Clase' }}
      />
      <Screen
        name="Add Subject"
        component={SubjectForm}
        options={{ ...darkHeaderConfig, title: 'Nueva Materia' }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                }}>
                <ThemeSwitch />
                <View style={{ marginLeft: 20 }} />
                <LogOutIcon />
              </View>
            );
          },
          ...darkHeaderConfig,
          title: 'Perfil',
        }}
      />
      <Screen
        name="Edit Subject"
        component={EditSubject}
        options={{
          ...darkHeaderConfig,
          title: 'Modificar',
        }}
      />
      <Screen
        name="Add Professor"
        component={AddProfessor}
        options={{
          ...darkHeaderConfig,
          title: 'Agregar Profesor',
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
    marginLeft: 10,
  },
};
