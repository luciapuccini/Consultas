import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStack, AuthStack } from './src/Routes';

const AuthContext = React.createContext();
export const AppProvider = AuthContext.Provider;
export const AppConsumer = AuthContext.Consumer;
// import { Context } from './src/context/AuthContext';

const { Navigator, Screen } = createStackNavigator();

//Home alumno
// buscar prof o materia
// lista consultas

// home docente
// consultas creadas fav +

const App = ({ navigation }) => {
  // const { state, signin, restore } = React.useContext(Context);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      // restore();
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        let token;
        await fetch('http://www.mocky.io/v2/5e89211c3100006800d39c05')
          .then((res) => res.json())
          .then((data) => {
            async () => await AsyncStorage.setItem('TOKEN', data.token);
            token = data.token;
          });

        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => {
        AsyncStorage.removeItem('TOKEN');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  return (
    <AppProvider value={authContext}>
      <NavigationContainer>
        <Navigator initialRouteName="SingIn">
          {state.userToken == null ? (
            <Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          ) : (
            // No token found, user isn't signed in
            // User Routes
            <Screen
              name="Routes"
              component={RootStack}
              options={{ headerShown: false }}
            />
          )}
        </Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
