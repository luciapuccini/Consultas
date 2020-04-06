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
            <Thumbnail source={image} />
            <Body>
              <Text>{name}</Text>
              <Text note>Sistemas</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <ImageBackground
            source={image}
            style={{ height: 200, width: null, flex: 1 }}>
            <View>{/* <Text>Prefesor: ADRIAN MECA</Text> */}</View>
          </ImageBackground>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="md-folder" />
              <Text>Editar</Text>
            </Button>
          </Left>

          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    </View>
  );
};
