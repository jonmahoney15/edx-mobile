import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Platform, StatusBar, SafeAreaView, ImageBackground, StyleSheet, View, Button } from "react-native"
import { Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"
import { FontAwesome, Feather } from '@expo/vector-icons'
import { colors } from "../theme"


const backgroundImage = require("../../assets/images/futuristic_library_technology.png")

interface ProgressScreenProps extends AppStackScreenProps<"Progress"> {}

export const ProgressScreen: FC<ProgressScreenProps> = observer(function ProgressScreen(
  _props,
) {
  const { navigation } = _props
  
  return (
    <View style={styles.blackBackground}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <FontAwesome name="angle-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>
            <View style={styles.titleArea}>
              <Text numberOfLines={1} style={styles.title}>Course Progress</Text>
              </View>
            <Feather name="user" color='#fff' size={24} onPress={() => navigation.goBack()}/>
          </View>
          <View style={styles.screenBody}>
            <View style={styles.completionCard}>
              <View style={styles.leftContent}>
                <Text style={styles.cardTitle}>Course completion</Text>
                <Text style={styles.description}>This represents how much of the course content you have completed. Note that some content may not yet be released.</Text>
              </View>
              <View style={styles.rightContent}>
                <Text textBreakStrategy="simple" style={styles.completionPercent}>0%</Text>
              </View>
            </View>
            <View style={styles.gradeCard}>
              <View style={styles.leftContent}>
                <Text style={styles.cardTitle}>Grades</Text>
                <Text style={styles.description}>This represents your weighted grade against the grade needed to pass this course.</Text>
              </View>
              <View style={styles.rightContent}>
                <Text textBreakStrategy="simple" style={styles.completionPercent}>0%</Text>
              </View>
            </View>
            <View style={styles.gradeCardBottom}> 
              <Text style={[styles.description, styles.gradeBottomText]}>A weighted grade of <Text weight="bold" style={[styles.description, styles.gradeBottomText]}>50%</Text> is required to pass in this course</Text>
            </View>
          </View>
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
    paddingBottom: 40,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '70%',
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
  screenBody: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 30,
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
