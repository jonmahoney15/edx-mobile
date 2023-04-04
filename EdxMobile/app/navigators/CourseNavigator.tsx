import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
  } from "@react-navigation/native"
  import { createNativeStackNavigator } from "@react-navigation/native-stack"
  import { StackScreenProps } from "@react-navigation/stack"
  import { observer } from "mobx-react-lite"
  import React from "react"
  import Config from "../config"
  import {
    CourseDetailScreen,
    ModuleScreen,
    WelcomeScreen
  } from "../screens"
  import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
  import { TabNavigator } from "./TabNavigator"

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
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >

      </Stack.Navigator>
    )
  })
  
  interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
  
  export const CourseNavigator = observer(function AppNavigator(props: NavigationProps) {
  
    useBackButtonHandler((routeName) => exitRoutes.includes(routeName))
  
    return (
        <AppStack />
    )
  })
  