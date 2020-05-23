import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

export const ErrorMessage = ({ message, style }) => {
  return (
    <View style={styles.errorStyle}>
      <Text style={styles.errorTextStyle}>{message}</Text>
    </View>
  );
};

const styles = {
  errorStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  errorTextStyle: {
    color: '#e53935',
  },
};
