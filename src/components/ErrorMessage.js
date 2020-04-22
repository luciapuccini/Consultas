import React from 'react';
import { Layout, Button } from '@ui-kitten/components';

export const ErrorMessage = ({ message }) => {
  return (
    <Layout level="1" style={styles.errorStyle}>
      <Button
        appearance="outline"
        status="danger"
        style={{ borderColor: 'white' }}>
        {message}
      </Button>
    </Layout>
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
