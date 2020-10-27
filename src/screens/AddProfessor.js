import React, { useState } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Input, Icon, Layout } from '@ui-kitten/components';
import { ErrorMessage } from '../components/ErrorMessage';
import { getToken } from '../utils/authHelper';
import { SERVER_URL } from '../utils/config';

export const AddProfessor = ({ navigation }) => {
  const [legajo, setLegajo] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const save = async () => {
    const token = await getToken();
    const body = { legajo, name, surname, email };

    const response = await fetch(`${SERVER_URL}/users/addProfessor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (json.message) {
      navigation.goBack();
    }
    if (json.error) {
      setError(json.error);
    }
  };
  return (
    <Layout level="1" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 10,
            flexDirection: 'row',
          }}>
          <Text category="h3">
            {name} {surname}
          </Text>
        </View>

        <Input
          style={styles.inputStyle}
          label="Legajo"
          placeholder={legajo}
          onChangeText={setLegajo}
          value={legajo}
          accessoryRight={renderBrushIcon}
        />

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
          label="Apellido"
          placeholder={surname}
          onChangeText={setSurname}
          value={surname}
          accessoryRight={renderBrushIcon}
        />
        <Input
          style={styles.inputStyle}
          label="Email"
          placeholder={email}
          onChangeText={setEmail}
          value={email}
          accessoryRight={renderBrushIcon}
        />

        <Button
          onPress={save}
          style={{ alignSelf: 'flex-end', marginTop: 10, marginRight: 10 }}>
          Agregar
        </Button>
      </ScrollView>
    </Layout>
  );
};

const renderBrushIcon = (props) => (
  <TouchableWithoutFeedback>
    <Icon {...props} name="edit-2-outline" />
  </TouchableWithoutFeedback>
);

const styles = {
  inputStyle: {
    marginHorizontal: 10,
  },
};
