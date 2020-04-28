import React from 'react';
import { Text, Button, Modal, Card, Icon } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { getHora } from '../utils/functions';

export const SimpleBookClass = ({
  hora,
  onSubmit,
  bookingFlag,
  handleConfirm,
}) => {
  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  return (
    <View style={{ flex: 1 }}>
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
    </View>
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
