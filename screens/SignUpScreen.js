import React, { useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { signUp } from '../services/authService';

export default function SignUpScreen({ onSignIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignUp = async () => {
        try {
            if (!email || !password) {
                console.log('Email and password are required');
                return;
            }
            const user = await signUp(email, password);
            if (user) {
                onSignIn();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Sign Up</Text>
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
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      );
    }