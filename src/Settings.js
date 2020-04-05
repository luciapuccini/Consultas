import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import { Context } from './context/AuthContext';

export const Settings = ({ navigation }) => {
  const { signout } = React.useContext(Context);

  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Button title="Log out" onPress={() => signout()} />
    </SafeAreaView>
  );
};
