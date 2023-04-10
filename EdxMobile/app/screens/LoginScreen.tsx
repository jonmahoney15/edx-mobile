import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, ImageBackground, View, Image, ImageStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { api } from "../services/api"
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      setAuthToken,
      validationErrors,
    },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("jpmahoney@vt.edu")
    setAuthPassword("Password1")
  }, [])

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  const login = async() => {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    
    if (Object.values(validationErrors).some((v) => !!v)) return

    const authenticated = true; //= await submitLogin() 

    if (authenticated) {
      console.log(authenticated)
      setAuthToken(String(Date.now()))
    } else {
      console.log(authenticated)
      setAuthToken('')
    }

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")
  }

  const submitLogin = async () => {
    
    const success = await api.post(
        '/api/user/v1/account/login_session/',
        {
          "email": authEmail,
          "password": authPassword
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          }
        }
      ).then(response => {
        console.log(response.data)
        return response.data.success ? response.data.success : false;
      })
      .catch((e) => {
        console.log('In Login Error:');
        console.log(e.toJSON());
        return false;
      }
    );

    return success;
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={"white"}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )
  
  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
      <View style={$contentandbackgroundImage}> 
        <View style={$contentContainer}>
          <Text testID="login-heading" tx="loginScreen.loginScreenTitle" preset="heading" style={$loginScreenTitleStyle} />
          {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
          
          <Image
            source={require('../../assets/images/app-icon-all.png')}
            style={$openEdxLogoImage}
          />
          <TextField
            value={authEmail}
            onChangeText={setAuthEmail}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTx="loginScreen.emailFieldPlaceholder"
            helper={errors?.authEmail}
            status={errors?.authEmail ? "error" : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />

          <TextField
            ref={authPasswordInput}
            value={authPassword}
            onChangeText={setAuthPassword}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            placeholderTx="loginScreen.passwordFieldPlaceholder"
            helper={errors?.authPassword}
            status={errors?.authPassword ? "error" : undefined}
            onSubmitEditing={login}
            RightAccessory={PasswordRightAccessory}
          />

          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            preset="orangeButton"
            onPress={login}
          />

          <Button
            tx="loginScreen.signUp"
            style={$signUpButton}
            preset="reversed"
            onPress={handleSignUpPress}
          />
        </View>
        <ImageBackground source={require('../../assets/images/loginPageImage.png')} style={$backgroundImage}>
        </ImageBackground>
      </View>
  )
})

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

const $signUpButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}