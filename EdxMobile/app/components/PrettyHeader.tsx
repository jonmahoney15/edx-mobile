import React from "react"
import { StyleSheet, View, Text, Platform } from "react-native"
import { FontAwesome, Feather } from '@expo/vector-icons'
import { colors, typography } from "../theme"


export interface PrettyHeaderProps {
  title: string
  theme: 'grey' | 'black'
  hasBackButton?: boolean
  hasProfileButton?: boolean
  onLeftPress?: ()=>void
  onRightPress?: ()=>void
}

export const PrettyHeader = ({title, theme, hasBackButton = true, hasProfileButton = true, onLeftPress=function(){}, onRightPress=function(){}}: PrettyHeaderProps) => {
  return (
    <View style={theme == 'grey' ? styles.greyHeader : styles.blackHeader}>
      {hasBackButton === false ?  <FontAwesome name="angle-left" color='transparent' size={30}/> : <FontAwesome name="angle-left" color='#fff' size={30} onPress={onLeftPress}/>}
      <View style={styles.titleArea}>
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
      </View>
      {hasProfileButton === false ?  <Feather name="user" color='transparent' size={24}/> : <Feather name="user" color='#fff' size={24} onPress={onRightPress}/>}
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
    marginTop: 12,
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
    fontFamily: typography.primary.normal,
    fontWeight: 'normal',
    color: 'white',
    textAlignVertical: 'center',
    width: 'auto',
  },
});
