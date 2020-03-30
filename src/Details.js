import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export const Details = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>Detaail</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </SafeAreaView>
  );
};
