import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Thumbnail } from 'native-base';
import { Card, Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es';
import { getUserImage, getFechaHora } from '../utils/functions';

const placeHolder = require('../assets/placeholder.png');

export const ClassCard = ({ clase, manager }) => {
  const navigation = useNavigation();
  const isLive = clase.status === 'En curso';
  const statusColor = isLive ? '#66BB6A' : '#64B5F6';
  const classCardImg = clase.professor.imagePath
    ? getUserImage(clase.professor.id)
    : placeHolder;
  return (
    <Card style={styles.space}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Class Detail', { clase, manager })}>
        <View style={styles.row}>
          <Thumbnail source={classCardImg} />
          <View>
            <View style={styles.cardStyle}>
              <Text category="h6">{clase.professor.name}</Text>
              <Text appearance="hint" style={{ fontSize: 14 }}>
                {getFechaHora(clase.initTime)}
              </Text>
            </View>
          </View>
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
