import React from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Professor = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Button title="classes" onPress={() => navigation.navigate('Details')} />
    </ScrollView>
  );
};
