import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    LoginScreen,
    WelcomeScreen,
    ProfileScreen
  } from "../screens"

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }