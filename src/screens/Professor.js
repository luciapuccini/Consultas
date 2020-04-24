import React from 'react';
import { Alert, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Text } from '@ui-kitten/components';

export const Professor = ({ route }) => {
  React.useEffect(() => {}, []);
  const { professor } = route.params;
  const chatImage = require('../assets/chat.png');

  const openChat = () => {
    const temp = professor.mobile || '3364637796';
    Linking.canOpenURL(`whatsapp://send?text=hola!`).then((res) => {
      if (res) {
        Linking.openURL(`whatsapp://send?text=hola!&phone=${temp}`);
      } else {
        Alert.alert(`Can't open Whatsapp, please Install de App`);
      }
    });
  };
  return (
    <View>
      <Text category="h2">{professor.name}</Text>
      <TouchableOpacity style={{ marginLeft: 150 }} onPress={() => openChat()}>
        <Image source={chatImage} style={{ height: 80, width: 80 }} />
      </TouchableOpacity>
    </View>
  );
};
