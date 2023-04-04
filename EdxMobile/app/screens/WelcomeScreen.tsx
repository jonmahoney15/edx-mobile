import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { Text } from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {Card, Button, Header} from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons' 

const courses = [
  {
    title: 'Introduction to React Native',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'Learn the basics of building mobile apps with React Native.',
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

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> { }

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props,
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  const handleCoursePress = (course) => {
    navigation.navigate('CourseDetail', {
      id: course.id,
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={$container}>
      <Header
        placement="left"
        leftComponent={<FontAwesome name="arrow-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>}
        centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
        rightComponent={<FontAwesome name="user" size={32} color="#fff" onPress={() => handleProfilePress()}/>}
        containerStyle={{
          justifyContent: 'space-around',
        }}
      />
      <SafeAreaView style={$bottomContainer}>
        <ScrollView >
          {
            courses.map((c, i) => ( 
              //@ts-ignore
              <Card key={c.title} containerStyle={$cardStyle}>
                <TouchableOpacity onPress={() => handleCoursePress(c)}>
                  <Image style={$courseImage} source={c.image} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16 }}>{c.title}</Text>
                <Button
                  title="View Course"
                  buttonStyle={$buttonStyle}
                  onPress={() => handleCoursePress(c)}
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

const $buttonStyle: ViewStyle = {
  backgroundColor: 'rgba(78, 116, 289, 1)',
  borderRadius: 3,
}
