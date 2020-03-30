import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export const Home = (props) => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>HOME</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Detail')}
      />
    </SafeAreaView>
  );
};
