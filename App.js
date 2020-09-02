import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import messaging from '@react-native-firebase/messaging';
import _ from 'underscore';

import { RootStack, AuthStack } from './src/Routes';
import { Context, Provider } from './src/context/AuthContext';
import { ThemeContext } from './/src/context/ThemeContext';
import { getToken } from './src/utils/authHelper';
const { Navigator, Screen } = createStackNavigator();

const App = ({ navigation }) => {
  const { state, restore } = React.useContext(Context);
  const [clase, setClase] = React.useState(null);
  const [subject, setSubject] = React.useState(null);

  React.useEffect(() => {
    // 1. handle app running in bgr
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      const { classId } = remoteMessage.data;
      const fetchClassData = async () => {
        const token = await getToken();
        return fetch(
          `http://181.164.121.14:25565/clases/findClassData/${classId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
          .then((response) => response.json())
          .then((json) => {
            if (json) {
              setClase(json);
              setSubject(json.subject);
              return 'ok';
            }
          })
          .catch((error) => {
            console.log('[ FAILED ]', error);
          });
      };
      const response = await fetchClassData();
      console.log('App -> response', response, clase, subject);
      if (response) {
        console.log('algo existe', response, clase, subject);
        navigation.navigate('Class Detail', {
          clase,
          manager: false,
          subject,
        });
      }
    });

    // 2. handle app open from quiet state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        //WARNING este caso esta null
        console.log('remote', remoteMessage);
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
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
