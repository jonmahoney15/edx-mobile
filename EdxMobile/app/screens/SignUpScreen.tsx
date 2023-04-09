import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, ImageBackground, View, Image, ImageStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { colors, spacing } from "../theme"
import { useStores } from "../models"
import { api } from "../services/api"
import { AppStackScreenProps } from "../navigators";

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }

       

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(
  _props
) {
    const { navigation } = _props
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");      
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
 
    const PasswordRightAccessory = useMemo(
        () =>
          function PasswordRightAccessory(props: TextFieldAccessoryProps) {
            return (
              <Icon
                icon={isPasswordHidden ? "view" : "hidden"}
                color={"white"}
                containerStyle={props.style}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              />
            )
          },
        [isPasswordHidden],
      )

      const handleSignUpPress = () => {
        navigation.navigate('Login');
      };

  return (
    <View style={$contentandbackgroundImage}> 
        <View style={$contentContainer}>
            <Text testID="login-heading" tx="loginScreen.loginScreenTitle" preset="heading" style={$loginScreenTitleStyle} />
            <Image
                source={require('../../assets/images/app-icon-all.png')}
                style={$openEdxLogoImage}
            />
            <TextField
                value={email}
                onChangeText={setEmail}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
            />
            <TextField
                value={username}
                onChangeText={setUsername}
                containerStyle={$textField}
                autoCapitalize="none"
            />
            <TextField
                value={name}
                onChangeText={setName}
                containerStyle={$textField}
            />
            <TextField
                value={password}
                onChangeText={setPassword}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isPasswordHidden}
                placeholderTx="loginScreen.passwordFieldPlaceholder"
                RightAccessory={PasswordRightAccessory}
            />

            <Button
                tx="loginScreen.signUp"
                style={$tapButton}
                preset="reversed"
                onPress={handleSignUpPress}
            />
        </View>
    </View>
  );
});


const $openEdxLogoImage: ImageStyle = {
    width: 100, 
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
};

const $contentandbackgroundImage: ViewStyle = {
    flex: 1,
    backgroundColor: 'black',
};

const $backgroundImage: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
};

const $contentContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    padding: 50
};

const $loginScreenTitleStyle: TextStyle = {
    marginTop: spacing.extraLarge,
    marginBottom: spacing.small,
    color: "white", // add this line to set the text color of the heading to white
    textAlign: 'center',
    fontSize: 34, // set the font size to 28
}

const $enterDetails: TextStyle = {
    marginBottom: spacing.large,
}

const $hint: TextStyle = {
    color: colors.tint,
    marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
    marginBottom: spacing.medium,
}

const $tapButton: ViewStyle = {
    marginTop: spacing.extraSmall,
}
