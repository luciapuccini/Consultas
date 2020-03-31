import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, SplashScreen } from '../screens';

export const RootStack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { Navigator, Screen } = createStackNavigator();
  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Navigator>
          {userToken == null ? (
            // No token found, user isn't signed in
            <Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            <Screen name="Home" component={Home} />
          )}
        </Navigator>
      )}
    </NavigationContainer>
  );
};
