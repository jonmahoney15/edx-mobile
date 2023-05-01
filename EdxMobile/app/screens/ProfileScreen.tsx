import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageBackground, View, StyleSheet, StatusBar, SafeAreaView, Platform } from "react-native"
import { Button, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { Header} from "react-native-elements" 
import { useStores } from "../models"
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from "../utils/formatDate"
import { PrettyHeader } from "../components/PrettyHeader"
import { colors } from "../theme/colors"

const backgroundImage = require('../../assets/images/futuristic-background.png');

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(
  _props,
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
    userStore: { username, language, country, name, level_of_education, profile_image, email, date_joined }
  } = useStores();
  return (      
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
             <View style={styles.translucentOverlay}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <PrettyHeader title="Profile" theme='grey' hasProfileButton={false} onLeftPress={() => navigation.goBack()}/>
                    <View style={styles.box}>
                        <Image source={{ uri: profile_image }}  style={styles.avatar}/>
                        <Text style={styles.userId}>{username}</Text>
                        <Text style={styles.memberSince}>Member since {formatDate(date_joined)}</Text>
                        <View style={styles.separator}/>
                        <Text style={styles.rowTextKey}>Full Name</Text>
                        <Text style={styles.rowTextValue}>{name}</Text>
                        <Text style={styles.rowTextKey}>Email</Text>
                        <Text style={styles.rowTextValue}>{email}</Text>
                        <Text style={styles.rowTextKey}>Location</Text>
                        <Text style={styles.rowTextValue}>{country}</Text>
                        <Text style={styles.rowTextKey}>Education</Text>
                        <Text style={styles.rowTextValue}>{level_of_education}</Text>
                        <Text style={styles.rowTextKey}>Primary Language Spoken</Text>
                        <Text style={styles.rowTextValue}>{language}</Text>
                        <Button text="Logout" onPress={logout} preset="orangeButton" />
                    </View>
                </SafeAreaView>   
             </View>
        </ImageBackground>
    
  )
});

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-start',
        height: '100%',
    },
    translucentOverlay: {
        flex: 1,
        backgroundColor: colors.translucentBackground,
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 25
    },
    userId:{
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        color: 'white',
        fontSize: 26,
    },
    memberSince:{
        width: '100%',
        color: 'white',
        fontSize: 14,
    },
    separator:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginVertical: 16,
    },
    avatarIcon:{
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerColumn: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
    },
    box:{
        margin:20,
    },
    rowTextKey: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fffa',
    },
    rowTextValue: {
        fontSize: 14,
        color: 'white',
        marginBottom: 30,
    }
})
