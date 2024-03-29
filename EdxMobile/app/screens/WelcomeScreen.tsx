import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { TextStyle, View, ViewStyle, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Platform, StatusBar, ImageBackground, ActivityIndicator } from "react-native";
import { Button, Text } from "../components";
import { useStores } from "../models";
import { AppStackScreenProps } from "../navigators";
import { colors, typography } from "../theme";
import { Card } from "react-native-elements";
import { FontAwesome, Feather } from '@expo/vector-icons';
import { api } from '../services/api';
import { LoadingIcon } from "../components/LoadingIcon";
import { PrettyHeader } from "../components/PrettyHeader";

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
    authenticationStore: { logout, isAuthenticated, authEmail, authToken },
    userStore: {
      setUserUsername,
      setUserEmail,
      setUserCountry,
      setUserDateJoined,
      setUserEducation,
      setUserFullName,
      setUserLanguage,
      setUserProfileImage
    }
  } = useStores();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const handleCoursePress = (course) => {
    navigation.push('CourseDetail', {
      id: course.course_id,
      title: course.name
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const requestCourses = async () => {
    await api.get('/api/courses/v1/courses', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      validateStatus: function (status) {
        return status < 500;
      }
    }
    ).then(response => {
      if (response.status === 200) {
        const { data } = response;
        let num = 0;
        let courses = [...data.results.map(course => ({ ...course, id: num++ }))]
        setCourses(courses);
      }
    }).catch((e) => {
      console.log('Error in Courses Load:');
      const error = Object.assign(e);
      console.log(error);
    }
    );
  }

  const fetchUserInfo = async () => {
    await api.get(`/api/user/v1/accounts?email=${authEmail}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      validateStatus: function (status) {
        return status < 500;
      }
    }).then(async response => {
      if (response.data?.length > 0) {
        const user = response.data[0];
        setUserCountry(user.country || "");
        setUserDateJoined(user.date_joined || "");
        setUserEmail(user.email || "");
        setUserFullName(user.name || "");
        setUserProfileImage(user.profile_image.image_url_full || "");
        setUserUsername(user.username || "");
        setUserLanguage(user?.language_proficiencies?.length > 0 ? user.language_proficiencies[0].code : "");
        setUserEducation(user?.level_of_education || "");
      }
    }).catch((e) => {
      console.log('Profile Load Error:');
      console.log(e.toJSON());
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      
      Promise.all([fetchUserInfo(), requestCourses()])
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <View style={$background}>
      <ImageBackground source={require('../../assets/images/enrollmentScreenBackroundImage.png')} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.translucentOverlay}>
          <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
          <SafeAreaView style={styles.container}>
            <PrettyHeader title="My Courses" theme="black" hasBackButton={false} onRightPress={handleProfilePress}  />
            <LoadingIcon isLoading={isLoading}>
              <View style={$bottomContainer}>
                <ScrollView>
                  {
                    courses.map((c, i) => (
                      //@ts-ignore
                      <Card key={c.name} containerStyle={$cardStyle}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', width: '50%' }}> 
                          <Text style={{ fontFamily: typography.primary.bold, fontSize: 15, color: colors.text, lineHeight: 18}}>{c.name}</Text>
                          <Text style={{ fontSize: 12, color: colors.textDim, lineHeight: 18 }}>{c.org} - {c.number}</Text>
                        </View>
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
            </LoadingIcon>
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
  backgroundColor: colors.translucentBackground,
  borderWidth: 0,
  padding: 14
}

const $viewCourseButtonStyle: ViewStyle = {
  marginTop: 6,
  width: '50%'
}

const $viewCourseFontStyle: TextStyle = {
  fontSize: 15,
  lineHeight: 20,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "space-around",
}