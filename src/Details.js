import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export const Details = ({ navigation, route }) => {
  React.useEffect(() => {
    if (route.params?.subject) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.subject]);
  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>SUBJECT {route.params.subject}</Text>
    </SafeAreaView>
  );
};
