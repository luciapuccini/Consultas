import React from 'react';
import { Layout, Button, Text } from '@ui-kitten/components';

export const ErrorMessage = ({ message, style }) => {
  return <Text style={styles.errorTextStyle}>{message}</Text>;
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
