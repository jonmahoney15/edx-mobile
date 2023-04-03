import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { Header, Avatar } from "react-native-elements" 

const user = {
  name : "First User",
  avatar : 'https://randomuser.me/api/portraits/women/50.jpg',
  email: "random@google.com"
}

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(
  _props,
) {
  const { navigation } = _props
  return (
    <View style={$container}>
        <Header
          placement="left"
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 20 } }}
          containerStyle={{
            justifyContent: 'space-around',
          }}
        />
        <Avatar
          size={180}
          rounded
          source={{ uri: user.avatar }}
          title="Avatar"
          containerStyle={$avatar}
        />
        <View style={$row}>
          <Text style={$rowTextKey}>Name</Text>
          <Text style={$rowTextValue}>{user.name}</Text>
        </View>
        <View style={$row}>
          <Text style={$rowTextKey}>Email</Text>
          <Text style={$rowTextValue}>{user.email}</Text>
        </View>
    </View>
    
  )
})

const $container: ViewStyle = {
  justifyContent: 'space-around',
  alignItems: 'center',
}

const $avatar: ViewStyle ={ 
  backgroundColor: 'grey' ,
  margin: 20
}

const $headerColumn: ViewStyle = {
  backgroundColor: 'transparent',
  alignItems: 'center',
  elevation: 1,
  marginTop: -1,
}
const $row:ViewStyle =  {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 16,
  borderRadius: 8,
  marginBottom: 2,
}

const $rowTextKey: TextStyle =  {
  fontSize: 16,
  fontWeight: 'bold'
}

const $rowTextValue: TextStyle =  {
  fontSize: 16
}