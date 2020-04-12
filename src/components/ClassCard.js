import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Right,
  Thumbnail,
} from 'native-base';
import { Button, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const profe = require('../assets/rick.jpg');

export const ClassCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <Card>
      <CardItem bordered>
        <Left>
          <Thumbnail source={profe} />
          <View style={{ flexDirection: 'column' }}>
            <Text>Fecha -- hora</Text>
            <Text note>Docente: Pickle riiiick</Text>
          </View>
        </Left>
        <Right>
          <TouchableOpacity
            style={{ height: 40 }}
            onPress={() =>
              navigation.navigate('Class Detail', { class: data })
            }>
            <Icon
              name="arrowhead-right-outline"
              style={{
                height: 40,
                tintColor: '#2D383A',
                width: 20,
              }}
            />
          </TouchableOpacity>
        </Right>
      </CardItem>
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
