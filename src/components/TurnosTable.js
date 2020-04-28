import React from 'react';
import {
  Layout,
  Text,
  Menu,
  MenuItem,
  IndexPath,
  Button,
} from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { getHora } from '../utils/functions';

export const TurnosTable = ({ turnos, handleConfirm, bookingFlag }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  const getSelectedTurno = () => {
    return turnos[selectedIndex].startTime;
  };

  return (
    <View style={{ flex: 1 }}>
      <Menu>
        {turnos.map((turno) => (
          <MenuItem
            title={getHora(turno.startTime)}
            disabled={turno.isTaken}
            onPress={(index) => setSelectedIndex(index)}
          />
        ))}
      </Menu>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ marginLeft: 10 }}>
          Confirm: {getHora(getSelectedTurno())}
        </Text>
        <Button
          appearance="outline"
          status={bookingFlag ? 'danger' : 'primary'}
          style={styles.inscriptionBtn}
          onPress={handleConfirm(selectedIndex)}>
          {btnText}
        </Button>
      </View>
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
