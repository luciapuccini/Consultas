import React from 'react';
import {
  Text,
  Menu,
  MenuItem,
  Button,
  ScrollView,
  Input,
} from '@ui-kitten/components';
import { View } from 'react-native';
import { getHora } from '../utils/functions';
import { getToken } from '../utils/authHelper';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  const getSelectedTurno = () => {
    console.log('getSelectedTurno -> turnos', turnos);
    return turnos[selectedIndex].turnoTime;
  };
  const handleSelection = ({ index }) => {
    setSelectedIndex(index.row);
    handleConfirm(selectedIndex);
  };
  const addNote = async () => {
    const body = { id, comment };
    const token = await getToken();

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
        if (json.message === 'Suceed') navigation.goBack();

        console.log(json.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Menu style={{ flex: 1, maxHeight: 400 }}>
        {turnos.map((turno) => (
          <MenuItem
            title={() => <StudentRow turno={turno} />}
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
          <View
            style={{
              flex: 1,
            }}>
            <Text
              category="h6"
              style={{
                marginLeft: 10,
                fontWeight: 'bold',
                color: '#689f38',
              }}>
              Confirmar: {getHora(getSelectedTurno())}
            </Text>
            <Button
              disabled={disabled}
              appearance="outline"
              status={bookingFlag ? 'danger' : 'primary'}
              style={styles.inscriptionBtn}
              onPress={() => onSubmit()}>
              {btnText}
            </Button>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '100%',
            }}>
            <Input
              textStyle={{ minHeight: 64 }}
              label="Notas"
              placeholder={comment}
              onChangeText={setComment}
              value={comment}
              multiline={true}
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
const StudentRow = ({ turno }) => {
  const { students } = turno;
  const names = students && students.map((s) => s.name.concat('  ', s.surname));

  return (
    <View
      style={{
        flex: 1,
        marginLeft: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxWidth: '80%',
        alignItems: 'baseline',
      }}>
      <Text category="s1">{getHora(turno.turnoTime)}</Text>
      {names && (
        <Text category="label" appearance="hint" numberOfLines={1}>
          {names.map((name) => name)}
        </Text>
      )}
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
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
};
