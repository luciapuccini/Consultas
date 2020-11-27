import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Thumbnail } from 'native-base';
import { Card, Icon, Text } from '@ui-kitten/components';
// import { useNavigation } from '@react-navigation/native';
import 'moment/locale/es';
import { getUserImage, getFechaHora } from '../utils/functions';

const placeHolder = require('../assets/placeholder.png');
const chatImage = require('../assets/chat.png');

export const InscriptionCard = ({ student }) => {
  // const navigation = useNavigation();

  const classCardImg =
    // student && student.profileImagePath
    // ? { uri: getUserImage(student.id) }
    // :
    placeHolder;
  const openPhone = () => {
    const temp = student.phone;
    Linking.canOpenURL('whatsapp://send').then((res) => {
      if (res) {
        Linking.openURL(`whatsapp://send?text=hola!&phone=${temp}`);
      } else {
        Alert.alert('Necesita tener Whatsapp Instalado en su telefono');
      }
    });
  };

  return (
    <Card style={styles.space}>
      <TouchableOpacity onPress={openPhone}>
        <View style={styles.row}>
          <Thumbnail source={classCardImg} />
          <View>
            <View style={styles.cardStyle}>
              <Text category="h6">{student.name + ' ' + student.surname}</Text>
              <View style={styles.row}>
                <Icon
                  name="message-circle-outline"
                  style={styles.iconStyle}
                  fill={'#228B22'}
                />

                <Text appearance="hint" style={{ fontSize: 14 }}>
                  {student.phone}
                </Text>
              </View>
            </View>
          </View>
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
  iconStyle: { width: 15, height: 15, marginRight: 5, marginTop: 2 },
});
