import React from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { Fab, Thumbnail, Content, H1 } from 'native-base';
import { Input, Icon, Text, Divider, Button } from '@ui-kitten/components';

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

  const renderBrushIcon = (props) => (
    <TouchableWithoutFeedback>
      <Icon {...props} name="brush" />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={styles.loginFlowContainer}>
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
              name="camera"
              fill="white"
              style={{
                height: 25,
                width: 25,
              }}
            />
          </Fab>
        </View>
      </ImageBackground>

      <Content>
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
          <H1>{name}'s Profile</H1>
        </View>
        <View style={{ margin: 10 }}>
          <Text category="h6" appearance="hint" style={{ paddingBottom: 5 }}>
            Legajo: {exampleUser.legajo}
          </Text>
          <Divider style={{ backgroundColor: '#b0bec5' }} />
        </View>

        <Input
          style={styles.inputStyle}
          label="Nombre"
          placeholder={name}
          onChangeText={setName}
          value={name}
          accessoryRight={renderBrushIcon}
        />
        <Input
          style={styles.inputStyle}
          label="Email"
          placeholder={name}
          onChangeText={setName}
          value={name}
          accessoryRight={renderBrushIcon}
        />
        <Input
          style={styles.inputStyle}
          label="Telefono"
          placeholder={name}
          onChangeText={setName}
          value={name}
          accessoryRight={renderBrushIcon}
        />
        <Button
          appearance="outline"
          style={{
            width: '50%',
            alignSelf: 'flex-end',
            marginTop: 20,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('Classes')}>
          Mis Inscripciones
        </Button>
      </Content>
    </SafeAreaView>
  );
};

const styles = {
  inputStyle: {
    marginHorizontal: 10,
  },
  loginFlowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
    maxHeight: 150,
  },
};
