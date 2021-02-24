import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {
  Button,
  Card,
  Modal,
  Text,
  Input,
  Icon,
  Divider,
} from '@ui-kitten/components';
import { ErrorMessage } from '../components/ErrorMessage';
import { getToken } from '../utils/authHelper';
// import { Context } from '../context/AuthContext';
import { SERVER_URL } from '../utils/config';
import { YearDropdown } from './YearDropdown';

export const SubjectsFilterModal = ({
  setVisible,
  visible,
  setSelectedYear,
}) => {
  const [year, setYear] = useState('');
  // const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    setSelectedYear(year.row + 1);
    setVisible(false);
  };
  const handleReset = async () => {
    setSelectedYear(null);
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
      style={styles.modal}>
      <Card disabled={true}>
        <View style={styles.row}>
          <Text category="s1">Filtrar materias</Text>
          <Icon
            onPress={() => setVisible(false)}
            name="close"
            fill="blue"
            style={styles.close}
          />
        </View>

        <YearDropdown selectedIndex={year} setSelectedIndex={setYear} />
        <Divider style={{ margin: 10 }} />
        <View style={styles.row}>
          <Button status="success" onPress={handleSubmit}>
            OK
          </Button>
          <Button appearance="outline" onPress={handleReset}>
            reset
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputStyle: {
    marginHorizontal: 10,
  },
  close: {
    height: 25,
    width: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  modal: { width: '60%', flex: 1 },
});
