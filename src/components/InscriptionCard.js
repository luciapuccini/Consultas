import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Thumbnail } from 'native-base';
import { Card, Icon, Text } from '@ui-kitten/components';
import 'moment/locale/es';
import { getUserImage } from '../utils/functions';

const placeHolder = require('../assets/placeholder.png');

export const InscriptionCard = ({ student }) => {
  const classCardImg =
    student && student.profileImagePath
      ? { uri: getUserImage(student.id) }
      : placeHolder;

  const openPhone = () => {
    const { mobile } = student;
    if (mobile) {
      Linking.canOpenURL('whatsapp://send').then((res) => {
        if (res) {
          Linking.openURL(`whatsapp://send?text=hola!&phone=${mobile}`);
        } else {
          Alert.alert('Necesita tener Whatsapp Instalado en su telefono');
        }
      });
    }
  };

  const openMail = () => {
    const { email } = student;
    if (email) {
      Linking.openURL(
        `mailto:${email}?subject=[ UTN-Consultas ] Seguimiento de tu inscripción`,
      );
    }
  };

  return (
    <Card style={styles.space}>
      <View style={styles.row}>
        <View style={styles.row}>
          <Thumbnail source={classCardImg} />
          <View style={styles.cardStyle}>
            <Text category="h6">{student.name + ' ' + student.surname}</Text>
            <Text appearance="hint" style={{ fontSize: 14 }}>
              {student.email}
            </Text>
            {student.mobile && student.showMobile && (
              <View style={styles.row}>
                <Text appearance="hint" style={{ fontSize: 14 }}>
                  {student.mobile}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.column}>
          {student.mobile && student.showMobile  &&(
            <TouchableOpacity onPress={openPhone}>
              <Icon
                name="message-circle-outline"
                style={styles.actionStyle}
                fill={'#228B22'}
              />
            </TouchableOpacity>
          )}
          <View style={{ margin: 10 }} />
          <TouchableOpacity onPress={openMail}>
            <Icon
              name="email-outline"
              style={styles.actionStyle}
              fill={'#0441bd'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  column: { justifyContent: 'space-between' },
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

  actionStyle: { width: 30, height: 30 },
});
