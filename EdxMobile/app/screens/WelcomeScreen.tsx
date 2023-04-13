import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Platform, StatusBar, ImageBackground} from "react-native"
import { Button, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import { Card } from "react-native-elements"
import { FontAwesome, Feather } from '@expo/vector-icons'
import { api } from '../services/api' 
import { PrettyHeader } from "app/components/PrettyHeader"
import { color } from "react-native-reanimated"

const hardcodedCourses = [
  {
    id: 0,
    course_id: 'course-v1:edx+DemoX+Into_React_Native',
    name: 'Introduction to React Native',
    org: 'edx',
    number: 'DemoX',
    short_description: 'Learn the basics of building mobile apps with React Native.',
  },
  {
    id: 1,
    name: 'Advanced React Native',
    org: 'edx',
    number: 'DemoX',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    short_description: 'React Native skills with advanced topics.',
  },
  {
    id: 2,
    name: 'HTML, JavaScript, CSS',
    org: 'edx',
    number: 'DemoX',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    short_description: 'Get started with the basics',
  },
  {
    id: 3,
    name: 'Advanced React Native 2',
    org: 'edx',
    number: 'DemoX',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    short_description: 'React Native skills with advanced topics.',
  },
  {
    id: 4,
    name: 'HTML, JavaScript, CSS 2',
    org: 'edx',
    number: 'DemoX',
    courseInfo: 'edX - DemoX',
    image: require("../../assets/images/word-cloud.jpeg"),
    short_description: 'Get started with the basics',
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const [courses, setCourses] = useState([]);
  const initialPaddingTop = 400;

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };


  const requestCourses = async () => {
    await api.get('/api/courses/v1/courses', {
          validateStatus: function (status) {
            return status < 500;
          }
        }
      ).then(response => {
        let num = 0;
        let courses = [...response.data.results.map(course => ({...course, id: num+1})), ...hardcodedCourses]
        setCourses(courses)
      })
      .catch((e) => {
        console.log('In Login Error:');
        console.log(e.toJSON());
        setCourses([...hardcodedCourses]);
      }
    );
  } 

  useEffect(() => {
    requestCourses();
  }, []);

  const paddingTop = initialPaddingTop - scrollPosition;

  return (
  <View style={$background}>
    <ImageBackground source={require('../../assets/images/enrollmentScreenBackroundImage.png')} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.translucentOverlay}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content"/>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.nameArea}>
              <Text numberOfLines={1} style={styles.name}>Course Progress</Text>
            </View>
            <Feather name="user" size={25} color="#fff" onPress={() => handleProfilePress()}/>
          </View>
          <View style={$bottomContainer}>
            <ScrollView>
              {
                courses.map((c, i) => ( 
                  //@ts-ignore
                  <Card key={c.name} containerStyle={$cardStyle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View>
                        <Text style={{ fontSize: 16, color: "white"}}>{c.name}</Text>
                      </View>
                      <TouchableOpacity onPress={() => console.log("add navigation to something?")}>
                        <FontAwesome name="gear" color='#fff' size={24} />
                      </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 16, color: "grey"}}>{c.org} - {c.number}</Text>
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
    </ImageBackground>
  </View>
  )
})

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  translucentOverlay: {
    flex: 1,
    backgroundColor: colors.translucentOverlay,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.headerDark,
    marginTop: 12,
  },
  nameArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  name: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
    textAlignVertical: 'center',
    width: 'auto',
  },
});

const $background: ViewStyle = {
  flex: 1,
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
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "space-around",
}