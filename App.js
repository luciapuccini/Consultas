import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { RootStack, AuthStack } from './src/Routes';
import { Context, Provider } from './src/context/AuthContext';

const { Navigator, Screen } = createStackNavigator();

const App = ({ navigation }) => {
  const { state, restore } = React.useContext(Context);
  React.useEffect(() => {
    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavigationContainer>
      <Navigator initialRouteName="SingIn">
        {state.userToken == null ? (
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
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <App />
      </ApplicationProvider>
    </Provider>
  );
};

export default AppWrapper;
