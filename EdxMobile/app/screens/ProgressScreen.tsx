import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Platform, StatusBar, SafeAreaView, ImageBackground, StyleSheet, View } from "react-native"
import { Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"
import { colors } from "../theme"
import { PrettyHeader } from "../components/PrettyHeader"
import { api } from "../services/api"
import { LoadingIcon } from "../components/LoadingIcon"

const backgroundImage = require("../../assets/images/futuristic_library_technology.png")

interface ProgressScreenProps extends AppStackScreenProps<"Progress"> { }

export const ProgressScreen: FC<ProgressScreenProps> = observer(function ProgressScreen(
  _props,
) {

  const {
    authenticationStore: {
      authToken
    }
  } = useStores();
  const { navigation } = _props
  const { id } = _props.route.params
  const [isLoading, setIsLoading] = useState(true);
  const [gradePercent, setGradePercent] = useState(0);
  const [passingPercent, setPassingPercent] = useState(50);
  const [completionPercent, setCompletionPercent] = useState(0);
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const fetchProgress = async () => {
    await api.get(`/api/course_home/progress/${id}/`, {
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
        const completed = data.completion_summary.complete_count;
        const incompleted = data.completion_summary.incomplete_count;
        const course_grade = data.course_grade.percent;
        const grade_range = data.grading_policy?.grade_range?.Pass;

        setPassingPercent(grade_range * 100);
        setGradePercent(course_grade * 100);
        let progress = Math.trunc((completed / (completed + incompleted)) * 100);
        setCompletionPercent(progress)
        setIsLoading(false);
      }
    })
    .catch((e) => {
        console.log('Error In Course Progress Load:');
        const error = Object.assign(e);
        console.log(error)
        setIsLoading(false);
    });
  }


  useEffect(() => {
    setIsLoading(true);
    fetchProgress();
  }, []);

  return (
    <View style={styles.blackBackground}>
      <ImageBackground source={backgroundImage} resizeMode="stretch" imageStyle={{ height: '70%' }} style={styles.backgroundImage}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <PrettyHeader title="Course Progress" theme="black" onLeftPress={() => navigation.goBack()} onRightPress={handleProfilePress} />
          <LoadingIcon isLoading={isLoading}>
            <View style={styles.screenBody}>
              <View style={styles.completionCard}>
                <View style={styles.leftContent}>
                  <Text style={styles.cardTitle}>Course completion</Text>
                  <Text style={styles.description}>This represents how much of the course content you have completed. Note that some content may not yet be released.</Text>
                </View>
                <View style={styles.rightContent}>
                  <Text textBreakStrategy="simple" style={styles.completionPercent}>{completionPercent}%</Text>
                </View>
              </View>
              <View style={styles.gradeCard}>
                <View style={styles.leftContent}>
                  <Text style={styles.cardTitle}>Grades</Text>
                  <Text style={styles.description}>This represents your weighted grade against the grade needed to pass this course.</Text>
                </View>
                <View style={styles.rightContent}>
                  <Text textBreakStrategy="simple" style={styles.completionPercent}>{gradePercent}%</Text>
                </View>
              </View>
              <View style={styles.gradeCardBottom}>
                <Text style={[styles.description, styles.gradeBottomText]}>A weighted grade of <Text weight="bold" style={[styles.description, styles.gradeBottomText]}>{passingPercent}%</Text> is required to pass in this course</Text>
              </View>
            </View>
          </LoadingIcon>
        </SafeAreaView>
      </ImageBackground>
    </View>

  )
})

const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  screenBody: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 70,
    paddingTop: 12,
  },
  completionCard: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.translucentBackground,
    borderRadius: 24,
    padding: 20,
    marginVertical: 20,
  },
  leftContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '75%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 12,
    lineHeight: 14,
  },
  rightContent: {
    flex: 1,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionPercent: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 30,
  },
  gradeCard: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.translucentBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: 16,
  },
  gradeCardBottom: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.secondaryButton,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 12,
    paddingLeft: 24,
  },
  gradeBottomText: {
    color: colors.black,
  },

});
