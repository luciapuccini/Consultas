import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import messaging from '@react-native-firebase/messaging';
import _ from 'underscore';

import { RootStack, AuthStack } from './src/Routes';
import { navigationRef, navigate } from './src/Routes';
import { Context, Provider } from './src/context/AuthContext';
import { ThemeContext } from './/src/context/ThemeContext';
import { getToken } from './src/utils/authHelper';
import { getUserRole } from './src/utils/functions';
const { Navigator, Screen } = createStackNavigator();

const App = () => {
  const { state, restore } = React.useContext(Context);
  React.useEffect(() => {
    //BACKGROUND
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      const { classId } = remoteMessage.data;
      const token = await getToken();
      const role = await getUserRole();
      const response = await fetch(
        `http://181.164.121.14:25565/clases/findClassData/${classId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await response.json();
      if (res) {
        navigate('Class Detail', {
          clase: { ...res, id: classId },
          manager: role === 'ROLE_PROFESSOR',
          subject: res.subject,
        });
      }
    });

    // KILLED
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        const token = await getToken();
        const role = await getUserRole();

        if (remoteMessage) {
          const classId = remoteMessage.data.classId;
          const response = await fetch(
            `http://181.164.121.14:25565/clases/findClassData/${classId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const res = await response.json();
          navigate('Class Detail', {
            clase: { ...res, id: classId },
            manager: role === 'ROLE_PROFESSOR',
            subject: res.subject,
          });
        }
      });
    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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
