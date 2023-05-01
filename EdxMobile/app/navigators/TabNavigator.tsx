import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import {
    CourseDetailScreen,
    DiscussionScreen,
    ProgressScreen,
    DatesScreen,
  } from "../screens"
import { colors } from '../theme';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();

export function TabNavigator({route, navigation}) {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingBottom: "5%",
          backgroundColor: colors.solidBackground,
          position: 'absolute',
          borderTopWidth: 0,
          height: '9%',
        },
        tabBarActiveTintColor: colors.primaryButton,
        tabBarInactiveTintColor: colors.text,
     })}>
        <Tab.Screen
            name="Modules"
            component={CourseDetailScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name='home' size={26} color={focused ? colors.primaryButton : colors.text}/>)}}
            initialParams={{
              id: route.params.id,
              title: route.params.title
            }}
        />
        <Tab.Screen
            name="Discussion"
            component={DiscussionScreen}
            options={{ tabBarIcon: ({focused}) => (<MaterialCommunityIcons name="comment-multiple" size={20} color={focused ? colors.primaryButton : colors.text} />)}}
            initialParams={{id: route.params.id}}
        />
        <Tab.Screen
            name="Progress"
            component={ProgressScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name="line-chart" size={19} color={focused ? colors.primaryButton : colors.text} />)}}
            initialParams={{id: route.params.id}}
            />
        <Tab.Screen
            name="Dates"
            component={DatesScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name="calendar" size={20} color={focused ? colors.primaryButton : colors.text} />)}}
            initialParams={{id: route.params.id}}
        />
      </Tab.Navigator>
    );
  }