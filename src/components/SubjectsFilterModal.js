import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Modal,
  Text,
  Icon,
  Divider,
} from '@ui-kitten/components';

import { YearDropdown } from './YearDropdown';
import { CareerDropdown } from './CareerDropdown';

export const SubjectsFilterModal = ({
  setVisible,
  visible,
  setSelectedYear,
  setSelectedCareer,
  multi,
}) => {
  const [year, setYear] = useState(''); //check if array
  const [career, setCareer] = useState([]);

  const handleSubmit = async () => {
    setSelectedYear(year.row + 1);
    setSelectedCareer(career);
    setVisible(false);
  };
  const handleReset = async () => {
    setSelectedYear(null);
    setSelectedCareer([]);
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

        <YearDropdown
          selectedIndex={year}
          setSelectedIndex={setYear}
          multi={multi}
        />
        <Divider style={{ margin: 10 }} />
        <CareerDropdown selectedIndex={career} setSelectedIndex={setCareer} />
        <Divider style={{ margin: 10 }} />
        <View style={styles.row}>
          <Button status="success" onPress={handleSubmit}>
            OK
          </Button>
          <Button appearance="outline" onPress={handleReset}>
            Reset
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
