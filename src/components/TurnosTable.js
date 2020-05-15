import React from 'react';
import {
  Text,
  Menu,
  MenuItem,
  Button,
  ScrollView,
} from '@ui-kitten/components';
import { View } from 'react-native';
import { getHora } from '../utils/functions';
import { getToken } from '../utils/authHelper';

export const TurnosTable = ({
  turnos,
  handleConfirm,
  bookingFlag,
  onSubmit,
  disabled,
  manager,
  id,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  const getSelectedTurno = () => {
    return turnos[selectedIndex].startTime;
  };
  const handleSelection = ({ index }) => {
    setSelectedIndex(index.row);
    handleConfirm(selectedIndex);
  };
  const addNote = async () => {
    const body = { id, comment };
    const token = await getToken();
    console.log('comment', body);

    fetch(`http://181.164.121.14:25565/clases/addComment`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Menu>
        {turnos.map((turno) => (
          <MenuItem
            title={getHora(turno.startTime)}
            disabled={turno.hasUsers}
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
        {!manager ? (
          <>
            <Text style={{ marginLeft: 10 }}>
              Confirm: {getHora(getSelectedTurno())}
            </Text>
            <Button
              disabled={disabled}
              appearance="outline"
              status={bookingFlag ? 'danger' : 'primary'}
              style={styles.inscriptionBtn}
              onPress={() => onSubmit()}>
              {btnText}
            </Button>
          </>
        ) : (
          <View
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Input
              label="Notas"
              placeholder={comment}
              onChangeText={setComment}
              value={comment}
            />
            <Button
              appearance="outline"
              status="primary"
              style={styles.inscriptionBtn}
              onPress={addNote}>
              Add notes
            </Button>
          </View>
        )}
      </View>
    </>
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
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
};
