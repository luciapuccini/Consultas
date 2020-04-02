import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export const Settings = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>settings</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </SafeAreaView>
  );
};
