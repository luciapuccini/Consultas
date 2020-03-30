import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/Home';
import { Details } from './src/Details';

const App = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Screen name="Home" component={Home} />
        <Screen name="Detail" component={Details} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
