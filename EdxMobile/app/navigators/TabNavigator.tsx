import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import {
    CourseDetailScreen,
    DiscussionScreen,
    ProgressScreen,
    DatesScreen
  } from "../screens"
import { CourseNavigator } from './CourseNavigator';

const Tab = createBottomTabNavigator();

export function TabNavigator({route, navigation}) {
    const course_id = route.params.course_id; //here I get the parameter from the previous screen

    return (
      <Tab.Navigator screenOptions={({ route }) => ({
         headerShown: false,
         tabBarStyle: {
           paddingHorizontal: 5,
           paddingTop: 0,
           backgroundColor: 'rgba(34,36,40,1)',
           position: 'absolute',
           borderTopWidth: 0,
       },
     })}>
        <Tab.Screen
            name="Modules"
            component={CourseDetailScreen}
            options={{ tabBarIcon: () => (<FontAwesome name='home' size={30} color="#fff"/>)}}
            initialParams={{id: route.params.id}}
        />
        <Tab.Screen
            name="Discussion"
            component={DiscussionScreen}
            options={{ tabBarIcon: () => (<MaterialCommunityIcons name="comment-multiple" size={24} color="#fff" />)}}
            initialParams={{id: route.params.id}}
        />
        <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{ tabBarIcon: () => (<FontAwesome name="line-chart" size={24} color="#fff" />)}}
            initialParams={{id: route.params.id}}
            />
        <Tab.Screen
            name="Dates"
            component={DatesScreen}
            options={{ tabBarIcon: () => (<FontAwesome name="calendar" size={24} color="#fff" />)}}
            initialParams={{id: route.params.id}}
        />
      </Tab.Navigator>
    );
  }