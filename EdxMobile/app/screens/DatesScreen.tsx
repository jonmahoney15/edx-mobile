import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Platform, StatusBar, SafeAreaView, ImageBackground, StyleSheet, View, Button } from "react-native"
import { Text } from "../components"
import { AppStackScreenProps, goBack } from "../navigators"
import { useStores } from "../models"
import { FontAwesome, Feather } from '@expo/vector-icons'
import { colors, typography } from "../theme"
import Timeline from 'react-native-timeline-flatlist'
import { fonts } from "react-native-elements/dist/config"
import { PrettyHeader } from "../components/PrettyHeader"


// example json response from /course_home/v1/dates/{course_key_string} endpoint
const datesResponseRaw = `
        "assignment_type": null,
        "complete": null,
        "date": "2023-03-22T17:49:21Z",
        "date_type": "course-start-date",
        "description": "",
        "learner_has_access": true,
        "link": "",
        "link_text": "",
        "title": "Course starts",
        "extra_info": null,
        "first_component_block_id": ""
        },
        {
        "assignment_type": "Homework",
        "complete": false,
        "date": "2023-04-01T01:49:21.127414Z",
        "date_type": "assignment-due-date",
        "description": "",
        "learner_has_access": true,
        "link": "https://courses.edx.org/courses/course-v1:edX+DemoX.1+2T2019/jump_to/block-v1:edX+DemoX.1+2T2019+type@sequential+block@9c1aacbb2795470e8473b059b59c3344",
        "link_text": "",
        "title": "Homework 1: Your First Grade",
        "extra_info": null,
        "first_component_block_id": "block-v1:edX+DemoX.1+2T2019+type@html+block@ee5aa1495478428d829d37d74281e454"
        },
        {
        "assignment_type": "Homework",
        "complete": false,
        "date": "2023-04-05T17:49:21.127414Z",
        "date_type": "assignment-due-date",
        "description": "",
        "learner_has_access": true,
        "link": "https://courses.edx.org/courses/course-v1:edX+DemoX.1+2T2019/jump_to/block-v1:edX+DemoX.1+2T2019+type@sequential+block@ae87afb9cd264a6bb31bbc1a155d96a0",
        "link_text": "",
        "title": "Homework 2: Forum Introduction",
        "extra_info": null,
        "first_component_block_id": "block-v1:edX+DemoX.1+2T2019+type@html+block@e0037cc0097d48d0af9e6e9ad7d0a492"
        },
        {
        "assignment_type": "Final Exam",
        "complete": false,
        "date": "2023-04-10T09:49:21.127414Z",
        "date_type": "assignment-due-date",
        "description": "",
        "learner_has_access": true,
        "link": "https://courses.edx.org/courses/course-v1:edX+DemoX.1+2T2019/jump_to/block-v1:edX+DemoX.1+2T2019+type@sequential+block@55880ce6a25f4180983fa23b027c695f",
        "link_text": "",
        "title": "Practice Final Quiz",
        "extra_info": null,
        "first_component_block_id": "block-v1:edX+DemoX.1+2T2019+type@html+block@0c747e2ec2404e7caa82ebfd7432f6a5"
        },
        {
        "assignment_type": null,
        "complete": null,
        "date": "2024-02-24T00:00:00Z",
        "date_type": "course-end-date",
        "description": "After the course ends, the course content will be archived and no longer active.",
        "learner_has_access": true,
        "link": "",
        "link_text": "",
        "title": "Course ends",
        "extra_info": null,
        "first_component_block_id": ""
        }
    ],
    "has_ended": false,
    "learner_is_full_access": true,
    "user_timezone": null
    }
`

const backgroundImage = require("../../assets/images/futuristic_realistic_classroom.png")

interface DateItemProps {
    title: string
    description?: string
    dueDate?: string
} 
const DateItem = (dateProps: DateItemProps) => {
    return (
        <View>
            <Text style={{marginBottom: Platform.OS === "android" ? -8 : -4,}}>
                <Text weight="bold" style={{fontSize:14,lineHeight: Platform.OS === "android" ? 20: 16,}}>{dateProps.title}</Text>
                {dateProps.description !== undefined && 
                    <Text style={{fontSize:14,}}>
                        : {dateProps.description}
                    </Text>
                }
            </Text>
            {dateProps.dueDate !== undefined && 
                <Text style={{ fontSize:14,}}>
                    {dateProps.dueDate}
                </Text>
            }
        </View> 
    )
}

interface DatesScreenProps extends AppStackScreenProps<"Dates"> {}
export const DatesScreen: FC<DatesScreenProps> = observer(function DatesScreen(
  _props,
) {
  const { navigation } = _props

  const dates = [
    {
        title: 'Wed, Mar 22, 2023', 
        description: <DateItem 
                        title='Couse Starts'
                    />
    },
    {
        circleColor: colors.primaryButton,
        title: 'Tue, Mar 28, 2023', 
        description: <DateItem 
                        title='Today'
                    /> 
        
    },
    {
        title: 'Fri, Mar 31, 2023',
        description: <DateItem 
                        title="Homework" 
                        description="Homework 1: Your First Grade" 
                        dueDate="due 9:00 PM EDT"
                    />
    },
    {
        title: 'Wed, Apr 5, 2023', 
        description: <DateItem 
                        title="Homework" 
                        description="Homework 2: Forum Introductions" 
                        dueDate="due 9:00 PM EDT"
                    />
    },
    {
        title: 'Mon, Apr 10, 2023', 
        description: <DateItem 
                        title="Final Exam" 
                        description="Practive Final Quiz" 
                        dueDate="due 11:59 PM EDT"
                    />
    },
    {
        title: 'Fri, Feb 23, 2024', 
        description: <DateItem 
                        title="Course Ends" 
                    />
    },
    {
        title: 'Fri, Feb 23, 2024', 
        description: <DateItem 
                        title="Course Ends" 
                    />
    },
    {
        title: 'Fri, Feb 23, 2024', 
        description: <DateItem 
                        title="Course Ends" 
                    />
    },
    {
        title: 'Fri, Feb 23, 2024', 
        description: <DateItem 
                        title="Course Ends" 
                    />
    },
    {
        title: 'Fri, Feb 23, 2024', 
        description: <DateItem 
                        title="Course Ends" 
                    />
    },
    {
        title: 'Fri, Feb 23, 2024', 
        description: <DateItem 
                        title="Course Ends" 
                    />
    }

]

const handleProfilePress = () => {
  navigation.navigate('Profile');
};

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <View style={styles.blackBackground}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content"/>
        <SafeAreaView style={styles.container}>
           <PrettyHeader title="Course Dates" theme="grey" onLeftPress={goBack} onRightPress={handleProfilePress}/>
            <View style={styles.screenBody}>
            <Timeline
                data={dates}
                showTime={false}
                titleStyle={{fontWeight: "400", fontSize: 16, color:colors.text, marginBottom:0,}}
                lineColor={colors.text}
                circleColor={colors.text}
                circleSize={12}
                rowContainerStyle={{minHeight: 90,}}
                eventContainerStyle={{marginTop:-14,}}   
            />
            </View>
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
