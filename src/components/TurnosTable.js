import React from 'react';
import {
  Text,
  Menu,
  MenuItem,
  Button,
  ScrollView,
  Icon,
  Input,
} from '@ui-kitten/components';
import { View,TouchableOpacity } from 'react-native';
import { getHora } from '../utils/functions';
import { getToken } from '../utils/authHelper';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from '../utils/config';

export const TurnosTable = ({
  turnos,
  bookingFlag,
  onSubmit,
  disabled,
  manager,
  id,
  expired,
  turnoSelected,
  setTurnoSelected
}) => {
  const [comment, setComment] = React.useState('');
  const navigation = useNavigation();

  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';

  const getSelectedTurno = () => {
    return turnoSelected.turnoTime;
  };

  const handleSelection = ({ index }) => {
    setTurnoSelected(turnos[index.row]);
    console.log('selectione:',turnos[index.row])

  };
  const addNote = async () => {
    const body = { id, comment };
    const token = await getToken();

    fetch(`${SERVER_URL}/clases/addComment`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Suceed') {
          navigation.goBack();
        }

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
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-around',
            }}>
            <Text
              category="h6"
              style={{
                marginLeft: 10,
                fontWeight: 'bold',
                color: '#689f38',
              }}>
              {expired
                ? 'FINALIZADA'
                : `Confirmar: ${getHora(getSelectedTurno())}`}
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
          <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Input
              label="Notas"
              placeholder={"Notas para la clase..."}
              onChangeText={setComment}
              value={comment}
              size="large"
              multiline={true}
              textStyle={{ minHeight: 64 }}
            />
          <TouchableOpacity onPress={addNote} style={{height:30, width: 30}}>
          <Icon
            fill='#5c5c5c'
            name="plus-square-outline"
          />
          </TouchableOpacity>           
          </View>
        </>
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
        //FIXME: Que hago con muchos inscriptos? number of lines == que names.length?
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
