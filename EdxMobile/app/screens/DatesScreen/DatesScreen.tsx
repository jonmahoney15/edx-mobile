import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Platform, StatusBar, SafeAreaView, ImageBackground, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "../../navigators"
import { colors } from "../../theme"
import Timeline from 'react-native-timeline-flatlist'
import { PrettyHeader } from "../../components/PrettyHeader"
import { api } from "../../services/api"
import { useStores } from "../../models"
import { DateItem } from "./DateItem"
import { formatDate } from "../../utils/formatDate"
import {LoadingIcon} from "../../components/LoadingIcon"

const backgroundImage = require("../../../assets/images/futuristic_realistic_classroom.png")

interface IDate {
  assignment_type: string;
  complete: string;
  date: string;
  date_type: string;
  description: string,
  learner_has_access: Boolean;
  link: string;
  link_text: string;
  title: string;
  extra_info: string;
  first_component_block_id: string;
}


interface DatesScreenProps extends AppStackScreenProps<"Dates"> { }
export const DatesScreen: FC<DatesScreenProps> = observer(function DatesScreen(
  _props,
) {
  const { navigation } = _props
  const { id } = _props.route.params

  const {
    authenticationStore: {
      authToken
    }
  } = useStores();

  const [isLoading, setIsLoading] = useState(true);
  const [courseDates, setCourseDates] = useState([]);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const fetchCourseDates = async () => {
    await api.get(`/api/course_home/dates/${id}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      validateStatus: function (status) {
        return status < 500;
      }
    }
    ).then(response => {
      let newCourseDates = [];

      if (response.status === 200) {
        const { data } = response;
        data.course_date_blocks.forEach((date: IDate) => {
          let newItem = {
            title: formatDate(date.date),
            description: <DateItem title={date.title} />
          }
          newCourseDates.push(newItem)
        });
      }

      const today = new Date();
      let found = false;
      newCourseDates.forEach(item => {
        if ((new Date(item.date)).getTime() === today.getTime()) {
          found = true;
          item.circleColor = colors.primaryButton;
        }
      });

      if (!found) {
        const dateString = today.toISOString();

        let todayItem = {
          circleColor: colors.primaryButton,
          title: formatDate(dateString),
          description: <DateItem title="Today" />
        }
        newCourseDates.push(todayItem)
      }

      setCourseDates(newCourseDates)
      setIsLoading(false);

    }).catch((e) => {
      console.log('Error In Course Dates Load:');
      const error = Object.assign(e);
      console.log(error)
      setIsLoading(false);

    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCourseDates();
  }, [])

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
      <View style={styles.blackBackground}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <PrettyHeader title="Course Dates" theme="grey" onLeftPress={navigation.goBack} onRightPress={handleProfilePress} />
           <LoadingIcon isLoading={isLoading}>
            <View style={styles.screenBody}>
              <Timeline
                data={courseDates}
                showTime={false}
                titleStyle={{ fontWeight: "400", fontSize: 16, color: colors.text, marginBottom: 0, }}
                lineColor={colors.text}
                circleColor={colors.text}
                circleSize={12}
                rowContainerStyle={{ minHeight: 90, }}
                eventContainerStyle={{ marginTop: -14, }}
              />
            </View>
          </LoadingIcon>
        </SafeAreaView>
      </View>
    </ImageBackground>
  )
})

const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: colors.translucentBackground,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 40,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.translucentBackground,
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
    height: '100%',
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
