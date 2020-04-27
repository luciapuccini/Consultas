import React from 'react';
import { Layout, Text, Button, Divider } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { getHora } from '../utils/functions';

export const SimpleBookClass = ({ hora, onSubmit, bookingFlag }) => {
  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  return (
    <Layout style={styles.selectionRow}>
      <Text style={{ alignSelf: 'center' }} category="s1">
        Confirmar Reserva para: {getHora(hora)}
      </Text>
      <Button
        appearance="outline"
        status={bookingFlag ? 'danger' : 'primary'}
        style={styles.inscriptionBtn}
        onPress={onSubmit}>
        {btnText}
      </Button>
    </Layout>
  );
};

const styles = {
  inscriptionBtn: {
    height: 20,
    alignSelf: 'flex-end',
  },
  selectionRow: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
};
