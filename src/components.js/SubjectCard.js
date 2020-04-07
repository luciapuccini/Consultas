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
export const SubjectCard = ({ name, image }) => {
  return (
    <View style={{ margin: 10 }}>
      <Card>
        <CardItem bordered>
          <Left>
            {/* <Thumbnail source={image} /> */}
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
            <Button transparent>
              <Icon active name="ios-alert" />
            </Button>
          </Left>

          <Right>
            <Text>Ver consultas ></Text>
          </Right>
        </CardItem>
      </Card>
    </View>
  );
};
