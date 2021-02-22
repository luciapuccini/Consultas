import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Modal, Text, Input, Icon } from '@ui-kitten/components';
import { ErrorMessage } from '../components/ErrorMessage';
import { getToken } from '../utils/authHelper';
import { Context } from '../context/AuthContext';
import { SERVER_URL } from '../utils/config';

export const EditPasswordModal = ({ setVisible, visible }) => {
  const { signout } = React.useContext(Context);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const body = { password, newPassword };
    if (newPassword === confirmPassword) {
      const token = await getToken();
      const response = await fetch(`${SERVER_URL}/users/modifyPassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (json.message == 'Password updated') {
        signout();
      } else {
        setError(json.message);
      }
    } else {
      setError('Contraseñas no coinciden ');
    }
  };
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
      style={{ maxWidth: 350, flex: 1 }}>
      <Card disabled={true}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: 15,
          }}>
          <Text category="s1">Edit Password</Text>
          <Icon
            onPress={() => setVisible(false)}
            name="close"
            fill="blue"
            style={{
              height: 25,
              width: 25,
            }}
          />
        </View>

        <Input
          style={[styles.inputStyle, { marginBottom: 10 }]}
          label="Password"
          secureTextEntry
          placeholder="Password"
          onChangeText={setPassword}
          accessoryRight={renderBrushIcon}
        />
        <Input
          style={[styles.inputStyle, { marginBottom: 10 }]}
          label="New Password"
          secureTextEntry
          placeholder="New Password"
          onChangeText={setNewPassword}
          accessoryRight={renderBrushIcon}
        />
        <Input
          style={[styles.inputStyle, { marginBottom: 10 }]}
          label="Confirm Password"
          secureTextEntry
          placeholder="Confirm password"
          onChangeText={setConfirmPassword}
          accessoryRight={renderBrushIcon}
        />
        {error ? <ErrorMessage message={error} /> : <View />}
        <Button onPress={handleSubmit}>SEND</Button>
      </Card>
    </Modal>
  );
};

const renderBrushIcon = (props) => (
  <TouchableWithoutFeedback onPress={() => console.log('pueod hacer esto')}>
    <Icon {...props} name="edit-2-outline" />
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputStyle: {
    marginHorizontal: 10,
  },
});
