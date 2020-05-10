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
} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';

import ErrorMessage from '../components/ErrorMessage';
import { getHora, getFecha } from '../utils/functions';

export const ClassForm = ({ visible, setVisible }) => {
  const [hasSingleTurno, setHasSingleTurno] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState(null);

  const openDatePicker = () => {
    setMode('date');
  };
  const openTimePicker = () => {
    setMode('time');
  };
  // const [hasSingleTurno, setHasSingleTurno] = useState(false);
  // const addClase = async () => {
  //   const body = {subjectId, initTime}
  //   const token = await getToken();
  //   fetch(`http://181.164.121.14:25565/clases/add/${subjectId}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log('ADD?', json);
  //     });
  // };
  return (
    <Layout level="1" style={styles.layout}>
      <Text category="h6">
        Selected date: {getFecha(date)} {getHora(date)}
      </Text>
      <Button appearance="outline" onPress={openDatePicker}>
        Elegir Fecha
      </Button>
      <Button appearance="outline" onPress={openTimePicker}>
        Elegir Hora de Inicio
      </Button>
      {mode && <ModalPicker showMode={mode} date={date} setDate={setDate} />}
    </Layout>
  );
};

const ModalPicker = ({ showMode, date, setDate }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
    padding: 15,
  },
});
