import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Card,
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
import moment from 'moment-timezone';
import { SERVER_URL } from '../utils/config';

export const ClassForm = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [hasSingleTurnos, setHasSingleTurnos] = useState(false);
  const [cantidadTurnos, setCantidadTurnos] = useState(1);
  const [isRegular, setIsRegular] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [link, setLink] = useState('');

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
      initTime: moment(date),
      hasSingleTurnos,
      isRegular,
      meetingLink: link,
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
    const token = await getToken();
    fetch(`${SERVER_URL}/clases/add`, {
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
    <ScrollView>
      <Layout level="1" style={styles.layout}>
        <Card style={styles.space} header={Header}>
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
            <Text>
              {date && `${moment(date).locale('es').format('lll a')}`}
            </Text>
          </View>
        </Card>

        <Input
          label={hasSingleTurnos ? 'Duracion' : 'Duracion de cada turno'}
          onChangeText={setDuration}
          keyboardType="numeric"
          caption="en minutos"
          style={styles.space}
        />
        {!hasSingleTurnos && (
          <Input
            label="Cantidad de Turnos"
            keyboardType="numeric"
            caption="Nosotros asignaremos una duracion a cada turno"
            onChangeText={setCantidadTurnos}
            style={styles.space}
          />
        )}
        <CheckBox
          style={styles.space}
          checked={hasSingleTurnos}
          onChange={(nextChecked) => setHasSingleTurnos(nextChecked)}>
          Clase de un solo turno
        </CheckBox>
        <CheckBox
          style={styles.space}
          checked={isRegular}
          onChange={() => setIsRegular(!isRegular)}>
          Clase Regular
        </CheckBox>
        <CheckBox
          style={styles.space}
          checked={isVirtual}
          onChange={(nextChecked) => setIsVirtual(nextChecked)}>
          Clase Virtual
        </CheckBox>
        {isVirtual && (
          <Input
            label="Link a la clase"
            caption="Link de zoom o hangouts"
            onChangeText={setLink}
            style={styles.space}
          />
        )}
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
      </Layout>
    </ScrollView>
  );
};

const ModalPicker = ({ mode, date, setDate, setShow }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    padding: 5,
  },
});

const CalenderIcon = (props) => (
  <Icon {...props} style={styles.pickerStyle} fill="#4169E1" name="calendar" />
);
const ClockIcon = (props) => (
  <Icon {...props} style={styles.pickerStyle} fill="#4169E1" name="clock" />
);

const Header = (props) => (
  <View {...props}>
    <Text category="h5">Selecione fecha</Text>
  </View>
);
