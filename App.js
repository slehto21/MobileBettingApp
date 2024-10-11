import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './screens/SignInScreen';
import SignOutScreen from './screens/SignOutScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ handleSignOut }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SignOut">
        {(props) => <SignOutScreen {...props} onSignOut={handleSignOut} />} 
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    // Todo - implement sign in & sing out
    setIsSignedIn(true); 
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isSignedIn ? (
          <Stack.Screen name="SignIn">
            {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
          >
            {(props) => <MainTabs {...props} handleSignOut={handleSignOut} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <AppNavigator />;
}