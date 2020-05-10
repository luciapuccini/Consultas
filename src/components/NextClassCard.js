import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';

const handleDate = (date) => {
  return moment(date).locale('es').format('lll');
};
export const NextClassCard = ({ clase, subject }) => {
  const navigation = useNavigation();
  const isLive = clase.status === 'En curso';
  const statusColor = !isLive ? '#FFCA28' : '#00C853';
  // add btn delete , add y checkbox c/u
  //
  return (
    <Card style={styles.space}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Class Detail', { clase })}>
        <View style={styles.cardStyle}>
          <Text category="h6">{subject.name}</Text>
          <Text style={{ fontSize: 14 }}>{handleDate(clase.initTime)}</Text>
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
