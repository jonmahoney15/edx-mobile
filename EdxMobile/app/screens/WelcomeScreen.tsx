import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Image, TextStyle, View, ViewStyle, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet} from "react-native"
import { Button, Text } from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {Card, Header} from "react-native-elements"
import { FontAwesome } from '@expo/vector-icons' 
import { NONE } from "apisauce"
import { LoginScreen } from "./LoginScreen"
import { log } from "console"

const courses = [
  {
    id: '3123123',
    title: 'Introduction to React Native',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'Learn the basics of building mobile apps with React Native.',
  },
  {
    id: '3123124',
    title: 'Advanced React Native',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'React Native skills with advanced topics.',
  },
  {
    id: '3123125',
    title: 'HTML, JavaScript, CSS',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'Get started with the basics',
  },
  {
    title: 'Advanced React Native 2',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    description: 'React Native skills with advanced topics.',
  },
  {
    title: 'HTML, JavaScript, CSS 2',
    courseInfo: 'edX - DemoX',
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

  const handleBackArrowPress = () => {
    navigation.navigate('Login');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const initialPaddingTop = 400;

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };



  const paddingTop = initialPaddingTop - scrollPosition;

  return (
  <View style={$container}>
    <Image
      source={require('../../assets/images/enrollmentScreenBackroundImage.png')}
      style={{ position: 'absolute'}}
      resizeMode="cover"
    />
    <SafeAreaView>
      <View style={styles.header}>
        <FontAwesome name="arrow-left" color='#fff' size={24} onPress={logout}/>
        <View style={styles.titleArea}>
          <Text numberOfLines={1} style={styles.title}>Course Progress</Text>
          </View>
        <FontAwesome name="user" size={25} color="#fff" onPress={() => handleProfilePress()}/>
      </View>
      <View style={$bottomContainer}>
        <ScrollView>
          {
            courses.map((c, i) => ( 
              //@ts-ignore
              <Card key={c.title} containerStyle={$cardStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 16, color: "white"}}>{c.title}</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="gear" color='#fff' size={24} />
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, color: "grey"}}>{c.courseInfo}</Text>
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
                  <Button
                    tx="enrollmentScreen.viewCourseButtonText"
                    style={$viewCourseButtonStyle}
                    textStyle={$viewCourseFontStyle}
                    preset="secondOrangeButton"
                    onPress={() => handleCoursePress(c)}
                  />
                </View>
              </Card>
            ))
          }
        </ScrollView>     
      </View>
    </SafeAreaView>
  </View>
  )
})

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: 12,
  },
  titleArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
    textAlignVertical: 'center',
    width: 'auto',
  },
});

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.enrollmentScreenBackgroundColor,
}

const $cardStyle: ViewStyle = {
  borderRadius: 20,
  backgroundColor:"rgba(30, 30, 30, 0.9)",
  borderColor: "rgba(30, 30, 30, 0.9)",
  padding: 20
}

const $viewCourseButtonStyle: ViewStyle = {
  width: 180
}

const $viewCourseFontStyle: TextStyle = {
  fontSize: 15,
  lineHeight: 20,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow:  0,
  flexBasis: "50%",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "space-around",
  marginTop: 400
}