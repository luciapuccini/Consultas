import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Icon, Text, CheckBox } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/es';
import { getFechaHora, getClassColor } from '../utils/functions';

export const SimpleClassCard = ({
  clase,
  subject,
  manager,
  toDelete,
  setToDelete,
}) => {
  const navigation = useNavigation();
  const cancel = clase.status === 'Cancelada';
  const statusColor = getClassColor(clase.status);

  return (
    <Card style={styles.space}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Class Detail', { clase, manager, subject })
        }>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.cardStyle}>
            <Text category="h6">{subject.name}</Text>
            <Text style={{ fontSize: 14 }}>{getFechaHora(clase.initTime)}</Text>
          </View>
          {!cancel && (
            <CheckBox
              checked={!!toDelete.includes(clase.id)}
              onChange={() =>
                toDelete.includes(clase.id)
                  ? setToDelete(toDelete.filter((cl) => cl !== clase.id))
                  : setToDelete([...toDelete, clase.id])
              }
            />
          )}
        </View>

        <View style={styles.textRowStyle}>
          <Text style={{ color: statusColor }}>{clase.status} </Text>
          <Icon
            name="checkmark-circle-outline"
            style={styles.checkStyle}
            fill={statusColor}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  space: { marginVertical: 14, marginHorizontal: 20 },
  cardStyle: {
    flexDirection: 'column',
    padding: 10,
  },
  textRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkStyle: { width: 15, height: 15, marginTop: 2 },
});
