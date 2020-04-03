import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { AppConsumer } from '../App';

export const Settings = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <AppConsumer>
        {context => (
          <Button title="Log out" onPress={() => context.signOut()} />
        )}
      </AppConsumer>
    </SafeAreaView>
  );
};
