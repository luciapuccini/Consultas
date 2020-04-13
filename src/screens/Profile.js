import React from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { Styles } from '../style/styles';
import { Fab, Thumbnail, Content, Text, H1 } from 'native-base';
import { Input, Icon } from '@ui-kitten/components';

const javaImage = require('../assets/java.png');
const exampleUser = {
  legajo: '42281',
  email: 'asdasd@asdasd.asd',
  name: 'Augusto',
  role: 'ROLE_STUDENT',
  mobile: '123456',
  subjects: [],
  books: [],
};

export const Profile = ({ navigation }) => {
  const [name, setName] = React.useState(exampleUser.name);
  const [photo, setPhoto] = React.useState(false);

  const { inputText, inputView } = styles;
  const renderIcon = (props) => (
    <TouchableWithoutFeedback>
      <Icon {...props} name="brush" />
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={[
          Styles.loginFlowContainer,
          {
            color: '#0b1b32',
            maxHeight: 150,
          },
        ]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Thumbnail
            source={javaImage}
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
          <Fab
            active={photo}
            containerStyle={{ marginLeft: 20 }}
            style={{
              backgroundColor: '#5067FF',
              height: 40,
              width: 40,
            }}
            position="bottomLeft"
            onPress={() => setPhoto(!photo)}>
            <Icon name="camera" />
          </Fab>
        </View>
      </ImageBackground>

      <Content>
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
          <H1>{name}'s Profile</H1>
        </View>

        <Input
          placeholder={name}
          onChangeText={setName}
          value={exampleUser.legajo}
          disabled={true}
        />
        <Input
          placeholder={name}
          onChangeText={setName}
          value={name}
          accessoryRight={renderIcon}
        />
        <Input
          placeholder={name}
          onChangeText={setName}
          value={name}
          accessoryRight={renderIcon}
        />
        <Input
          placeholder={name}
          onChangeText={setName}
          value={name}
          accessoryRight={renderIcon}
        />
      </Content>
    </SafeAreaView>
  );
};

const styles = {
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
};
