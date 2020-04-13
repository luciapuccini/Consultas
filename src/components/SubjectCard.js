import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';

import { Card, Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'native-base';

export const SubjectCard = ({ name, image }) => {
  const [notification, setNotification] = React.useState(false);
  const navigation = useNavigation();

  const notificationIcon = notification ? 'bell-outline' : 'bell-off-outline';

  const onNotificationChange = () => {
    setNotification(!notification);
    //TODO:
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
          source={image}
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
