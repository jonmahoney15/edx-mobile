import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'
import { WelcomeScreen } from "../screens"
import { CourseNavigator } from './CourseNavigator';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Courses" component={CourseNavigator} options={{ tabBarIcon: () => (<FontAwesome name='home' size={30} color="#fff"/>)}}/>
      </Tab.Navigator>
    );
  }