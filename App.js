import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStack, AuthStack } from './src/Routes';

import { Context, Provider } from './src/context/AuthContext';

const { Navigator, Screen } = createStackNavigator();

const App = ({ navigation }) => {
  const {
    state: { userToken },
  } = React.useContext(Context);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="SingIn">
        {userToken == null ? (
          <Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Screen
            name="Routes"
            component={RootStack}
            options={{ headerShown: false }}
          />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};

export default AppWrapper;
