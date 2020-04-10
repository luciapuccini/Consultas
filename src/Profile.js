import React from 'react';
import { SafeAreaView, View, ImageBackground } from 'react-native';
import { Styles } from './style/styles';
import { Fab, Thumbnail, Icon, Content, Text, H1 } from 'native-base';
import Input from './components/Input';
import InputBox from './components/InputBox';

const javaImage = require('./assets/java.png');
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
            <Icon
              type="SimpleLineIcons"
              name="camera"
              style={{ fontSize: 25 }}
            />
          </Fab>
        </View>
      </ImageBackground>

      <Content>
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
          <H1>{name}'s Profile</H1>
        </View>
        <Input
          label="Legajo"
          placeholder={name}
          onChangeText={setName}
          value={exampleUser.legajo}
          isDisabled={true}
        />
        <Input
          label="Name"
          placeholder={name}
          onChangeText={setName}
          value={name}
        />
        <Input
          label="Email"
          placeholder={name}
          onChangeText={setName}
          value={name}
        />
        <Input
          label="Mobile"
          placeholder={name}
          onChangeText={setName}
          value={name}
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
