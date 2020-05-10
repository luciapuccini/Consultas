import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Button,
  Card,
  Modal,
  Text,
  Input,
  Icon,
  Layout,
  CheckBox,
} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getToken } from '../utils/authHelper';
import ErrorMessage from '../components/ErrorMessage';
import { getHora, getFecha, asMinutes } from '../utils/functions';

export const ClassForm = ({ route }) => {
  const { subjectId } = route.params;
  const [mode, setMode] = useState(null);

  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [hasSingleTurnos, setHasSingleTurnos] = React.useState(false);
  const [cantidadTurnos, setCantidadTurnos] = useState(1);
  const [isRegular, setIsRegular] = React.useState(false);

  const openDatePicker = () => {
    setMode('date');
  };
  const openTimePicker = () => {
    setMode('time');
  };

  const addClase = async () => {
    const duracion = hasSingleTurnos
      ? { durationInMinutes: duration }
      : { turnoDuration: duration };
    const hasTurnos = !hasSingleTurnos ? { cantidadTurnos } : null;
    const body = {
      subjectId,
      initTime: date,
      duracion,
      hasSingleTurnos,
      isRegular,
      hasTurnos,
    };
    console.log('CREO TURNO', body);
    const token = await getToken();
    fetch(`http://181.164.121.14:25565/clases/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('ADD?', json);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Layout level="1" style={styles.layout}>
      <Text category="h5">
        Selecione fecha: {'\n'}
        {getFecha(date)} {getHora(date)}
      </Text>
      <View style={styles.dateRow}>
        <Button
          style={styles.pickerStyle}
          appearance="ghost"
          accessoryLeft={CalenderIcon}
          onPress={openDatePicker}
        />
        <Button
          style={styles.pickerStyle}
          appearance="ghost"
          onPress={openTimePicker}
          accessoryLeft={ClockIcon}
        />
      </View>
      <Input
        label="Duracion"
        onChangeText={(text) => setDuration(asMinutes(text))}
        keyboardType="numeric"
      />
      {!hasSingleTurnos && (
        <Input
          label="Cantidad de Turnos"
          caption="Nosotros asignaremos una duracion a cada turno"
          onChangeText={setCantidadTurnos}
        />
      )}
      <CheckBox
        checked={hasSingleTurnos}
        onChange={(nextChecked) => setHasSingleTurnos(nextChecked)}>
        Clase de un solo turno
      </CheckBox>
      <CheckBox
        checked={isRegular}
        onChange={(nextChecked) => setIsRegular(nextChecked)}>
        Clase Regular
      </CheckBox>

      {mode && (
        <ModalPicker
          showMode={mode}
          setMode={setMode}
          date={date}
          setDate={setDate}
        />
      )}
      <Button appearance="primary" onPress={addClase}>
        Confirmar
      </Button>
    </Layout>
  );
};

const ModalPicker = ({ showMode, setMode, date, setDate }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setMode(false);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      timeZoneOffsetInMinutes={0}
      value={date}
      mode={showMode}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 15,
  },
  pickerStyle: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

const CalenderIcon = (props) => (
  <Icon {...props} style={styles.pickerStyle} fill="#4169E1" name="calendar" />
);
const ClockIcon = (props) => (
  <Icon {...props} style={styles.pickerStyle} fill="#4169E1" name="clock" />
);
