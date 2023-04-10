import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'
import {
    CourseDetailScreen,
    DiscussionScreen,
    ProgressScreen,
    DatesScreen,
  } from "../screens"
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export function TabNavigator({route, navigation}) {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingBottom: 4,
          backgroundColor: colors.solidBackground,
          position: 'absolute',
          borderTopWidth: 0,
          height: '7%',
        },
        tabBarActiveTintColor: colors.primaryButton,
        tabBarInactiveTintColor: colors.text,
     })}>
        <Tab.Screen
            name="Modules"
            component={CourseDetailScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name='home' size={26} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}}/>)}}
            initialParams={{
              id: route.params.id,
              title: route.params.title
            }}
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
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name="line-chart" size={19} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}}/>)}}
            initialParams={{id: route.params.id}}
            />
        <Tab.Screen
            name="Dates"
            component={DatesScreen}
            options={{ tabBarIcon: ({focused}) => (<FontAwesome name="calendar" size={20} color={focused ? colors.primaryButton : colors.text} style={{marginBottom:-5,}}/>)}}
            initialParams={{id: route.params.id}}
        />
      </Tab.Navigator>
    );
  }