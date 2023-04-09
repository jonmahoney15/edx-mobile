import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { FontAwesome, Feather } from '@expo/vector-icons'
import { colors } from "../theme"


export interface PrettyHeaderProps {
  title: string
  theme: 'grey' | 'black'
  onLeftPress: ()=>void
  onRightPress: ()=>void
}

export const PrettyHeader = (props: PrettyHeaderProps) => {
  return (
    <View style={props.theme == 'grey' ? styles.greyHeader : styles.blackHeader}>
      <FontAwesome name="angle-left" color='#fff' size={30} onPress={props.onLeftPress}/>
      <View style={styles.titleArea}>
        <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
        </View>
      <Feather name="user" color='#fff' size={24} onPress={props.onRightPress}/>
    </View>
  )
}
 
const styles = StyleSheet.create({
  greyHeader: {
    display: 'flex',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.translucentBackground,
    marginTop: 75,
  },
  blackHeader: {
    display: 'flex',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.headerDark,
    marginTop: 75, 
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
