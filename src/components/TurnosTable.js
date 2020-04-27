import React from 'react';
import {
  Layout,
  Text,
  Menu,
  MenuItem,
  IndexPath,
  Button,
  Modal,
  Card,
  Icon,
  Divider,
} from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { getHora } from '../utils/functions';

export const TurnosTable = ({
  selectedIndex,
  setSelectedIndex,
  turnos,
  showConfirm,
  setShowConfirm,
  handleConfirm,
  bookingFlag,
  onSubmit,
}) => {
  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';

  return (
    <View style={{ flex: 1 }}>
      <Menu
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        {turnos.map((turno) => (
          <MenuItem title={getHora(turno.startTime)} disabled={turno.isTaken} />
        ))}
      </Menu>
      <Text style={{ alignSelf: 'center' }} category="s1">
        Confirmar Reserva
      </Text>
      <Button
        appearance="outline"
        status={bookingFlag ? 'danger' : 'primary'}
        style={styles.inscriptionBtn}
        onPress={onSubmit}>
        {btnText}
      </Button>

      <Modal
        visible={showConfirm}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setShowConfirm(false)}>
        <Card disabled={true}>
          <TouchableOpacity onPress={() => handleConfirm()}>
            <Icon
              style={{ height: 20, width: 20 }}
              name="close"
              fill="#8F9BB3"
            />
          </TouchableOpacity>

          <Text>Inscipto a: {turnos[selectedIndex - 1].startTime}</Text>
        </Card>
      </Modal>
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
