import React from 'react';
import { View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

export const ProfessorCard = ({ professor }) => {
  const navigation = useNavigation();

  const goToProfessor = () => {
    navigation.navigate('Professor', { professor });
  };
  const { name, surname } = professor;
  return (
    <Card style={styles.subjectCardStyle} onPress={goToProfessor}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text category="h5" appearance="alternative">
          {name} {surname}
        </Text>
      </View>
    </Card>
  );
};

const styles = {
  bellSize: { width: 22, height: 22 },
  subjectCardStyle: {
    marginHorizontal: 20,
    marginVertical: 14,
    flex: 1,
    backgroundColor: '#3D5AFE',
  },
  subjectImageStyle: {
    height: 200,
    width: null,
    flex: 1,
    marginVertical: -16,
    marginHorizontal: -24,
  },
  subjectCardHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
};
