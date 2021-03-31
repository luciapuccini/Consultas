import React from 'react';
import { Text, Button, Input,Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
import { getHora } from '../utils/functions';
import { getToken } from '../utils/authHelper';
import { useNavigation } from '@react-navigation/native';
import { SERVER_URL } from '../utils/config';

export const SimpleBookClass = ({
  hora,
  onSubmit,
  bookingFlag,
  handleConfirm,
  disabled,
  manager,
  id,
  expired,
}) => {
  const [comment, setComment] = React.useState('');
  const btnText = bookingFlag ? 'Desinscribirme' : 'Inscribirme';
  const navigation = useNavigation();

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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      }}>
      {!manager ? (
        <>
          <Text style={expired ? styles.expired : styles.active} category="h6">
            {expired ? 'FINALIZADA' : `Confirmar: ${getHora(hora)}`}
          </Text>

          <Button
            disabled={disabled}
            appearance="outline"
            status={bookingFlag ? 'danger' : 'primary'}
            style={styles.inscriptionBtn}
            onPress={onSubmit}>
            {btnText}
          </Button>
        </>
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
          <TouchableOpacity onPress={addNote} style={{height:10, width: 30, height: 30, top:65, right:30 }}>
          <Icon
            fill='#5c5c5c'
            name="plus-square-outline"
            style ={{ width: 25, height: 25, left:350, bottom:60  }}
          />
          </TouchableOpacity>  
          </View>
          
        </>
        )}
    </View>
  );
};

const styles = {
  active: { marginLeft: 10, fontWeight: 'bold', color: '#689f38' },
  expired: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#93cceap',
  },
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
