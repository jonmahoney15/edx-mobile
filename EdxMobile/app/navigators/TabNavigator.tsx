import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'
import {
    CourseDetailScreen,
    DiscussionScreen
  } from "../screens"
import { CourseNavigator } from './CourseNavigator';

const Tab = createBottomTabNavigator();

export function TabNavigator({route, navigation}) {
    const course_id = route.params.course_id; //here I get the parameter from the previous screen

    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name="Courses"
            component={CourseDetailScreen}
            options={{ tabBarIcon: () => (<FontAwesome name='home' size={30} color="#fff"/>)}}
            initialParams={{
                id: route.params.id}}
        />
        <Tab.Screen
            name="Discussion"
            component={CourseDetailScreen}
            options={{ tabBarIcon: () => (<FontAwesome name='home' size={30} color="#fff"/>)}}
            initialParams={{
                id: route.params.id}}
            />
      </Tab.Navigator>
    );
  }