import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Professor = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button title="classes" onPress={() => navigation.navigate('Details')} />
    </SafeAreaView>
  );
};
