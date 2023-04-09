import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, ImageBackground, View, Image, ImageStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
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
    setAuthEmail("student@vt.edu")
    setAuthPassword("password")
  }, [])

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (Object.values(validationErrors).some((v) => !!v)) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
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

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    // <Screen
    //   preset="auto"
    //   contentContainerStyle={$screenContentContainer}
    //   safeAreaEdges={["top", "bottom"]}
    // >
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
            // labelTx="loginScreen.emailFieldLabel"
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
            // labelTx="loginScreen.passwordFieldLabel"
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
        </View>
        <ImageBackground source={require('../../assets/images/loginPageImage.png')} style={$backgroundImage}>
        </ImageBackground>
      </View>
    // </Screen>
  )
})

const $openEdxLogoImage: ImageStyle = {
  width: 100, 
  height: 100,
  alignSelf: 'center',
  resizeMode: 'contain',
  // overflow: 'hidden',
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

// const $screenContentContainer: ViewStyle = {
// }

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
  // marginTop: spacing.extraSmall,
}

// @demo remove-file
