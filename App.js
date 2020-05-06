import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import _ from 'underscore';

import { RootStack, AuthStack } from './src/Routes';
import { Context, Provider } from './src/context/AuthContext';
import { ThemeContext } from './/src/context/ThemeContext';
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
        {_.isEmpty(state.userToken) ? (
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
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Provider>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <App />
          </ApplicationProvider>
        </Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default AppWrapper;
