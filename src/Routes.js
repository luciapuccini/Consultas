import React from 'react';
import { Home, SignInScreen, SignUpScreen } from './screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Classes } from './screens/Classes';
import { Profile } from './Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Context } from './context/AuthContext';
import { ClassDetail } from './screens/ClassDetail';

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
      <Screen name="Classes" component={Classes} />
      <Screen name="Class Detail" component={ClassDetail} />

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
      <Icon name="person" style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  );
};
const LogOutIcon = () => {
  const { signout } = React.useContext(Context);
  const { profileIconStyle } = Styles;
  return (
    <TouchableOpacity onPress={() => signout()}>
      <Icon name="settings" style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  );
};

const Styles = {
  profileIconStyle: { fontSize: 30, marginRight: 20, color: '#a9a9a9' },
};
