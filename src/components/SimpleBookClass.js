import React from 'react';
import { Text, Button, Modal, Card, Icon } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { getHora } from '../utils/functions';

export const SimpleBookClass = ({
  hora,
  onSubmit,
  bookingFlag,
  handleConfirm,
  disabled,
}) => {
  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      }}>
      <Text style={{ marginLeft: 10 }} category="s1">
        Confirm: {getHora(hora)}
      </Text>
      <Button
        disabled={disabled}
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
