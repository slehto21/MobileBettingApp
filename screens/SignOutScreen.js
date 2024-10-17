import React from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from '../services/authService';

export default function SignOutScreen({ navigation }) {

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace('SignIn');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign Out Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
