import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Left, Right, Thumbnail } from 'native-base';
import { Card, Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const profe = require('../assets/rick.jpg');

export const ClassCard = ({ data }) => {
  const navigation = useNavigation();
  const statusColor = data.status == 'Confirmada' ? '#FFCA28' : '#00C853';
  return (
    <Card style={{ marginVertical: 14, marginHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Class Detail', { class: data })}>
        <View style={{ flexDirection: 'row' }}>
          <Thumbnail source={profe} />

          <View>
            <View style={{ flexDirection: 'column', padding: 10 }}>
              <Text> 10/10/2020 10:00 hs</Text>
              <Text appearance="hint"> Pickle riiiick</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={{ color: statusColor }}>{data.status} </Text>
          <Icon
            name="checkmark-circle-outline"
            style={{ width: 15, height: 15, marginTop: 2 }}
            fill={statusColor}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
