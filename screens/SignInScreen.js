import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { signIn } from '../services/authService';

export default function SignInScreen({ onSignIn, navigation }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      if (user) {
        onSignIn();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, width: 200 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, width: 200 }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Don't have an account? Sign Up!</Text>
      </TouchableOpacity>
    </View>
  );
}