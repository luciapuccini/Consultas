import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import { Card, Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import 'moment/locale/es';
import { getUserImage, getFechaHora, getClassColor } from '../utils/functions';

const placeHolder = require('../assets/placeholder.png');

export const ClassCard = ({ clase, manager, subject }) => {
  const { professor } = clase;
  const navigation = useNavigation();
  // const statusColor = getClassColor(clase.status);

  const classCardImg =
    professor && professor.profileImagePath
      ? { uri: getUserImage(professor.id) }
      : placeHolder;

  const [initTime, setinitTime] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (clase.classe) {
      setinitTime(clase.classe.initTime);
      setStatus(clase.classe.status);
    } else {
      setinitTime(clase.initTime);
      setStatus(clase.status);
    }
  }, [clase]);

  return (
    <Card style={styles.space}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Class Detail', { clase, manager, subject })
        }>
        <View style={styles.row}>
          <Thumbnail source={classCardImg} />
          <View>
            <View style={styles.cardStyle}>
              <Text category="h6">
                {professor.name + ' ' + professor.surname} 
              </Text>

              <Text appearance="hint" style={{ fontSize: 14 }}>
                {getFechaHora(initTime)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.textRowStyle}>
          <Text style={{ color: getClassColor(status) }}>{status} </Text>
          <Icon
            name="checkmark-circle-outline"
            style={styles.checkStyle}
            fill={getClassColor(status)}
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
