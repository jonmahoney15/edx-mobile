import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, Image, ImageBackground,View,StyleSheet,  ViewStyle, Button } from "react-native"
import { Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { Header, Avatar } from "react-native-elements" 
import { useStores } from "../models"
import { FontAwesome, FontAwesome5, SimpleLineIcons,Feather } from '@expo/vector-icons'

const backgroundImage = require('../../assets/images/futuristic-background.png');

const user = {
    id:"sloanej",
    memberSince: "2023",
    fullName : "Jack Sloane",
    avatar : undefined,
    location: "United States",
    education: "Bachelor's Degree",
    language: "English",
    email: "random@google.com"
}

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(
  _props,
) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()
  return (
    <View style={styles.container}>
        <Header
            placement="left"
            leftComponent={<FontAwesome name="arrow-left" color='#fff' size={24} onPress={() => navigation.goBack()}/>}
            containerStyle={{
            justifyContent: 'space-around',
          }}
        />
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.backgroundTransparency}>
                <View style={styles.box}>
                    {user.avatar ? (
                        <Image source={{ uri: user.avatar }}  style={styles.avatar}/>
                      ) : (
                         <View style={styles.avatarIcon}>
                            <FontAwesome5 name="user-alt" size={50} color="white" />
                         </View>
                    )}
                  <Text style={styles.userId}>{user.id}</Text>
                  <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
                  <View style={styles.separator}/>
                  <Text style={styles.rowTextKey}>Full Name</Text>
                  <Text style={styles.rowTextValue}>{user.fullName}</Text>
                  <Text style={styles.rowTextKey}>Location</Text>
                  <Text style={styles.rowTextValue}>{user.location}</Text>
                  <Text style={styles.rowTextKey}>Education</Text>
                  <Text style={styles.rowTextValue}>{user.education}</Text>
                  <Text style={styles.rowTextKey}>Primary Language Spoken</Text>
                  <Text style={styles.rowTextValue}>{user.language}</Text>
                  <Button title="Logout" color="red" onPress={logout} />
                </View>
            </View>
        </ImageBackground>
    </View>
  )
})


const styles = StyleSheet.create({
    backgroundTransparency: {
        flex: 1,
        backgroundColor: '#000c',
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 25
    },
    userId:{
        flexDirection: 'row',
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