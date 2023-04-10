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
  ProfileScreen,
  ModuleScreen,
  WelcomeScreen,
  SignUpScreen,
  ProgressScreen,
  CourseDetailScreen
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { TabNavigator } from "./TabNavigator"

type CourseDetailScreenParams = {
  id: string
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
  Discussion: undefined
  SignUp: undefined
  Progress: undefined
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
            component={CourseDetailScreen}
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
            name="Progress"
            component={ProgressScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />
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
