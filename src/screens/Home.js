import * as React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { AppConsumer } from '../../App';

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <AppConsumer>
        {context => {
          console.log(context);
          return <Text>Welcome {context.username}</Text>;
        }}
      </AppConsumer>
      <Button onPress={navigation.navigate('Detail')} title="dale" />
      <AppConsumer>
        {context => <Button title="Sign out" onPress={context.signOut} />}
      </AppConsumer>
    </SafeAreaView>
  );
};
