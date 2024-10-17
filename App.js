import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import SignInScreen from './screens/SignInScreen';
import SignOutScreen from './screens/SignOutScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import BetsScreen from './screens/BetsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ handleSignOut }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'SignOut') {
            iconName = focused ? 'log-out' : 'log-out-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bets" component={BetsScreen} />
      <Tab.Screen name="SignOut">
        {(props) => <SignOutScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AppNavigator() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignInScreen {...props} onSignIn={() => setIsSignedIn(true)} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} onSignOut={() => setIsSignedIn(false)} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
          >
            {(props) => <MainTabs {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <AppNavigator />;
}