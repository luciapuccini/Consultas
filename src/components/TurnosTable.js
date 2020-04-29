import React from 'react';
import { Text, Menu, MenuItem, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import { getHora } from '../utils/functions';

export const TurnosTable = ({ turnos, handleConfirm, bookingFlag }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  const getSelectedTurno = () => {
    return turnos[selectedIndex].startTime;
  };
  const handleSelection = ({ index }) => {
    setSelectedIndex(index.row);
  };

  return (
    <View>
      <Menu>
        {turnos.map((turno) => (
          <MenuItem
            title={getHora(turno.startTime)}
            disabled={turno.isTaken}
            onPress={handleSelection}
          />
        ))}
      </Menu>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text style={{ marginLeft: 10 }}>
          Confirm: {getHora(getSelectedTurno())}
        </Text>
        <Button
          appearance="outline"
          status={bookingFlag ? 'danger' : 'primary'}
          style={styles.inscriptionBtn}
          onPress={() => handleConfirm(selectedIndex)}>
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
