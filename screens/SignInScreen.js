import React from 'react';
import { View, Text, Button } from 'react-native';

function SignInScreen({ onSignIn }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the app! Please sign in.</Text>
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}

export default SignInScreen;
