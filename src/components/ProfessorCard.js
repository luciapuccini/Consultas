import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const professorPlaceholder = require('../assets/rick.jpg');

const findSubjectImage = (subjectName) => {
  // const image = require(`../assets/${subjectName}.png`);
  return professorPlaceholder;
};

export const ProfessorCard = ({ professor }) => {
  const navigation = useNavigation();

  const { name, image } = professor;

  const goToProfessor = () => {
    navigation.navigate('Professor', { professor });
  };

  const Header = () => {
    return (
      <View style={styles.subjectCardHeaderStyle}>
        <View style={{ width: '80%' }}>
          <Text category="h6">{name}</Text>
        </View>
      </View>
    );
  };

  return (
    <Card footer={Header} style={styles.subjectCardStyle}>
      <TouchableOpacity onPress={() => goToProfessor()}>
        <Image
          source={findSubjectImage(image)}
          style={styles.subjectImageStyle}
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = {
  bellSize: { width: 22, height: 22 },
  subjectCardStyle: {
    marginHorizontal: 30,
    marginVertical: 14,
    flex: 1,
    backgroundColor: '#E3F2FD',
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
