import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'native-base';

const subjectPlaceholder = require('../assets/java.png');
const findSubjectImage = (subjectName) => {
  // const image = require(`../assets/${subjectName}.png`);
  return subjectPlaceholder;
};

export const SubjectCard = ({ subject }) => {
  const [notification, setNotification] = React.useState(subject.follows);
  const navigation = useNavigation();
  const notificationIcon = notification ? 'bell-outline' : 'bell-off-outline';

  const { subjectId, name, image } = subject;

  const onNotificationChange = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    setNotification(!notification);

    const body = {
      id: subjectId,
      studentId: id,
    };

    if (notification === true) {
      // http://www.mocky.io/v2/5e98fd103500005fa1c486f9
      // http://181.164.121.14:25565/subjects/followSubject
      // http://181.164.121.14:25565/subjects/unfollowSubject
      try {
        fetch('http://www.mocky.io/v2/5e98fd103500005fa1c486f9', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => console.log(data.message));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        fetch('http://www.mocky.io/v2/5e98fd103500005fa1c486f9', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => console.log(data.message));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const goToClasses = () => {
    //TODO: handle class de esa sub
    navigation.navigate('Classes', { subject });
  };

  const Header = () => {
    return (
      <View style={styles.subjectCardHeaderStyle}>
        <View style={{ width: '80%' }}>
          <Text category="h6">{name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={onNotificationChange}>
            <Icon
              style={styles.bellSize}
              name={notificationIcon}
              fill="#8F9BB3"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Card header={Header} style={styles.subjectCardStyle}>
      <TouchableOpacity onPress={goToClasses}>
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
