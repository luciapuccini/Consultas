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
  const [notification, setNotification] = React.useState(true);
  const navigation = useNavigation();
  const notificationIcon = notification ? 'bell-off-outline' : 'bell-outline';
  const { subjectId, name, image } = subject;

  const onNotificationChange = async () => {
    const id = await AsyncStorage.getItem('USER_ID');
    setNotification(!notification);

    const body = {
      id: subjectId,
      studentId: id,
    };

    if (notification === true) {
      try {
        fetch('http://181.164.121.14:25565/subjects/followSubject', {
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
        fetch('http://181.164.121.14:25565/subjects/unfollowSubject', {
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

  const goToSubject = () => {
    navigation.navigate('Classes', { subject: name });
  };

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 5,
        }}>
        <View style={{ width: '80%' }}>
          <Text category="h6">{name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={onNotificationChange}>
            <Icon
              style={{ width: 22, height: 22 }}
              name={notificationIcon}
              fill="#8F9BB3"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Card
      header={Header}
      style={{
        marginHorizontal: 30,
        marginVertical: 14,
        flex: 1,
        backgroundColor: '#E3F2FD',
      }}>
      <TouchableOpacity onPress={goToSubject}>
        <Image
          source={findSubjectImage(image)}
          style={{
            height: 200,
            width: null,
            flex: 1,
            marginVertical: -16,
            marginHorizontal: -24,
          }}
        />
      </TouchableOpacity>
    </Card>
  );
};
