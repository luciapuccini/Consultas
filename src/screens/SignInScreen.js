import * as React from 'react';
import { Button, TextInput, View } from 'react-native';
import { AppConsumer } from '../../App';

export const SignInScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppConsumer>
        {context => (
          <Button
            title="Sign in"
            onPress={() => context.signIn({ username, password })}
          />
        )}
      </AppConsumer>
    </View>
  );
};
