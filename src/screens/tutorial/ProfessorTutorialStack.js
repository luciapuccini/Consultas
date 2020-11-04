import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { View } from 'react-native';

export const ProfessorTutorialStack = () => {
  return (
    <Layout level={2} style={style.container}>
      <Text>Professor Tutorial</Text>
      <View style={style.row}>
        <Button appearance="primary">Siguiente</Button>
        <Button appearance="outline">Saltear</Button>
      </View>
    </Layout>
  );
};

const style = {
  container: {
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};
