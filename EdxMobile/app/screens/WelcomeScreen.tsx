import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { Text } from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import {Card, Button} from "react-native-elements" 

const welcomeLogo = require("../../assets/images/logo.png")

const courses = [
  {
     title: 'Introduction to React Native',
     image: require("../../assets/images/word-cloud.jpeg"),
     description: 'Learn the basics of building mobile apps with React Native.'
  },
  {
    title: 'Advanced React Native',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'React Native skills with advanced topics.',

 },
 {
   title: 'HTML, JavaScript, CSS',
   image: require("../../assets/images/word-cloud.jpeg"),
   description: 'Get started with the basics',
}
 ]

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props,
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  useHeader({
    rightTx: "common.logOut",
    onRightPress: logout
  })

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const handleCoursePress = (course) => {
    navigation.navigate('CourseDetail', {
      title: course.title,
      description: course.description,
      image: course.image
    });
  };

  return (
    <View style={$container}>
      <SafeAreaView style={$bottomContainer}>
        <ScrollView >
          {
            courses.map((c,i) =>(
              <Card key={c.title} containerStyle={$cardStyle}>
                  <TouchableOpacity onPress={() => handleCoursePress(c)}>
                    <Image style={$courseImage} source={c.image} resizeMode="contain" />
                  </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>{c.title}</Text>
                <Button
              title="View Course"
              buttonStyle={$buttonStyle}
            />
              </Card>
          ))
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $cardStyle: ViewStyle = {
  borderRadius: 10
}
const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.small,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "100%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}
const $courseImage: ImageStyle = {
  height: 169,
  width: "100%"
}
const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}

const $buttonStyle: ViewStyle = {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
}