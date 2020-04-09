import React from 'react';
import { Image, View, ImageBackground } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

export const SubjectCard = ({ name, image }) => {
  const [notification, setNotification] = React.useState(false);
  const navigation = useNavigation();

  const notificationIcon = notification
    ? 'ios-notifications'
    : 'ios-notifications-outline';

  const onNotificationChange = () => {
    setNotification(!notification);
    //TODO:
  };
  const goToSubject = () => {
    console.log('to subject');
    navigation.navigate('Details', { subject: name });
  };
  return (
    <View style={{ margin: 10 }}>
      <Card>
        <CardItem bordered>
          <Left>
            <Body>
              <Text>{name}</Text>
              <Text note>Sistemas</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <ImageBackground
            source={image}
            style={{ height: 200, width: null, flex: 1 }}></ImageBackground>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent onPress={onNotificationChange}>
              <Icon
                active
                name={notificationIcon}
                style={{ fontSize: 30, color: '#c02942' }}
              />
            </Button>
          </Left>

          <Right>
            <Button transparent onPress={goToSubject}>
              <Icon
                active
                name="ios-arrow-dropright"
                style={{ fontSize: 30, color: '#a9a9a9' }}
              />
            </Button>
          </Right>
        </CardItem>
      </Card>
    </View>
  );
};
