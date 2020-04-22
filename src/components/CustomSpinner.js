import React from 'react';
import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

export const CustomSpinner = () => {
  return (
    <View style={styles.spinStyle}>
      <Spinner />
    </View>
  );
};

const styles = {
  spinStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
};
