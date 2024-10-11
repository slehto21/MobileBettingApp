import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SignOutScreen({ onSignOut }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign Out Screen</Text>
      <Button title="Sign Out" onPress={onSignOut} />
    </View>
  );
}
