import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models"
import {
  LoginScreen,
  CourseDetailScreen,
  ProfileScreen,
  ModuleScreen,
  WelcomeScreen
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { Tab } from "react-native-elements"
import { TabNavigator } from "./TabNavigator"
import { CourseNavigator } from './CourseNavigator';

type CourseDetailScreenParams = {
  title: string;
  description: string;
  image: string;
  modules: ModuleScreenParams[];
};

type ModuleScreenParams = {
  id: string,
  title: string;
  duration: string;
  videoId: string;
  bodyText: string;
}

export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Profile: undefined
  CourseDetail: CourseDetailScreenParams
  Module: ModuleScreenParams
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen 
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            name="CourseDetail"
            component={TabNavigator}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
          />
          <Stack.Screen
            name="Module"
            component={ModuleScreen}
          />
          <Stack.Screen 
            name="Profile"
            component={ProfileScreen}  
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
