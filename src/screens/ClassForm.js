import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Button,
  Text,
  Input,
  Icon,
  Layout,
  CheckBox,
} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getToken } from '../utils/authHelper';
import { ErrorMessage } from '../components/ErrorMessage';
import moment from 'moment';

export const ClassForm = ({ route, navigation }) => {
  console.log('ClassForm -> route', route);

  const { subjectId } = route.params;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [hasSingleTurnos, setHasSingleTurnos] = React.useState(false);
  const [cantidadTurnos, setCantidadTurnos] = useState(1);
  const [isRegular, setIsRegular] = React.useState(false);
  // const [failed, setFailed] = React.useState(null);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const openDatePicker = () => {
    showMode('date');
  };
  const openTimePicker = () => {
    showMode('time');
  };
  const onGoBack = () => {
    navigation.goBack();
    route.params.refresh();
  };

  const addClase = async () => {
    const basicClass = {
      subjectId,
      initTime: date,
      hasSingleTurnos,
      isRegular,
    };
    const duracion = hasSingleTurnos
      ? { durationInMinutes: duration }
      : { turnoDuration: duration };
    const turnos = !hasSingleTurnos ? { cantidadTurnos } : null;
    const body = {
      ...basicClass,
      ...duracion,
      ...turnos,
    };
    console.log('addClase -> body', body);
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
        if (json.error || json.lenght > 0) {
          const alertMessage = json.message ? json.message : json;
          Alert.alert(
            'No pudimos crear las clases',
            `${JSON.stringify(alertMessage)}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  onGoBack();
                },
              },
            ],
            { cancelable: false },
          );
        } else {
          onGoBack();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Layout level="1" style={styles.layout}>
      <ScrollView contentContainerStyle={styles.layout}>
        <Text category="h5">
          Selecione fecha: {'\n'}
          {date ? `${moment(date).locale('es').format('lll a')}` : null}
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
          label={hasSingleTurnos ? 'Duracion' : 'Duracion de cada turno'}
          onChangeText={setDuration}
          keyboardType="numeric"
          caption="en minutos"
        />
        {!hasSingleTurnos && (
          <Input
            label="Cantidad de Turnos"
            keyboardType="numeric"
            caption="Nosotros asignaremos una duracion a cada turno"
            onChangeText={setCantidadTurnos}
          />
        )}
        <CheckBox
          checked={hasSingleTurnos}
          onChange={(nextChecked) => setHasSingleTurnos(nextChecked)}>
          Clase de un solo turno
        </CheckBox>
        <CheckBox checked={isRegular} onChange={() => setIsRegular(!isRegular)}>
          Clase Regular
        </CheckBox>

        {show && (
          <ModalPicker
            mode={mode}
            date={date}
            setDate={setDate}
            setShow={setShow}
          />
        )}
        {/* {failed && <ErrorMessage message={failed} />} */}
        <Button appearance="primary" onPress={addClase}>
          Confirmar
        </Button>
      </ScrollView>
    </Layout>
  );
};

const ModalPicker = ({ mode, date, setDate, setShow }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    console.log('onChange -> currentDate', currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      timeZoneOffsetInMinutes={0}
      value={date}
      mode={mode}
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
