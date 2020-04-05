import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppConsumer } from '../App';
// import { AuthContext } from './context/AuthContext';

const clearAll = async () => {
  try {
    await AsyncStorage.removeItem('TOKEN');
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
export const Settings = ({ navigation }) => {
  // const { signout } = React.useContext(AuthContext);

  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <AppConsumer>
        {(context) => (
          <Button title="Log out" onPress={() => context.signOut()} />
        )}
      </AppConsumer>
      {/* <Button title="Log out" onPress={() => signout()} /> */}
    </SafeAreaView>
  );
};
