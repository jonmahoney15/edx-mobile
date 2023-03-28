import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    LoginScreen,
    WelcomeScreen,
    ProfileScreen
  } from "../screens"

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
      <Tab.Navigator
      screenOptions={{ headerShown: false }}>
        <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
      </Tab.Navigator>
    );
  }