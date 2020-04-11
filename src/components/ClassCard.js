import React from 'react';
import { View, Text } from 'react-native';

export const ClassCard = ({ data }) => {
  console.log(data);
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  );
};
