import * as React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { AppConsumer } from '../../App';

export const Home = () => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>HOME</Text>
      <AppConsumer>
        {context => <Button title="Sign out" onPress={context.signOut} />}
      </AppConsumer>
    </SafeAreaView>
  );
};
