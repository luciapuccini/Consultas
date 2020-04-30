import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Card, Text, Button } from '@ui-kitten/components';
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

  const FollowIcon = (props) => <Icon {...props} name="star" />;

  return (
    <Card style={styles.subjectCardStyle} onPress={goToProfessor}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text category="h5">{professor.name}</Text>
        <Button
          appearance="outline"
          status="primary"
          accessoryRight={FollowIcon}>
          Follow
        </Button>
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
