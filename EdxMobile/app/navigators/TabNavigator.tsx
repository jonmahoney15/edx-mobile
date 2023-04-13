import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import {
    CourseDetailScreen,
    DiscussionScreen,
    ProgressScreen,
    DatesScreen
  } from "../screens"
import { CourseNavigator } from './CourseNavigator';
import { colors } from '../theme';
// import { useRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export function TabNavigator({route, navigation}) {
    const course_id = route.params.course_id; //here I get the parameter from the previous screen
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingBottom: 4,
          backgroundColor: colors.solidBackground,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.primaryButton,
        tabBarInactiveTintColor: colors.text,
     })}>
        <Tab.Screen
            name="Modules"
            component={CourseDetailScreen}
            options={ {tabBarIcon: ({focused}) => (<FontAwesome name='home' size={26} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}}/>)}}
            initialParams={{id: route.params.id}}
        />
        <Tab.Screen
            name="Discussion"
            component={DiscussionScreen}
            options={{ tabBarIcon: ({focused}) => (<MaterialCommunityIcons name="comment-multiple" size={20} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}} />)}}
            initialParams={{id: route.params.id}}
        />
        <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name="line-chart" size={20} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}}/>)}}
            initialParams={{id: route.params.id}}
            />
        <Tab.Screen
            name="Dates"
            component={DatesScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name="calendar" size={24} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}}/>)}}
            initialParams={{id: route.params.id}}
        />
      </Tab.Navigator>
    );
  }