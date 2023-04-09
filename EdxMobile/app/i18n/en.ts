const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "Welcome to Open Edx Mobile Development",
    readyForLaunch: "Your app, almost ready for launch!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    loginScreenTitle: "Start Learning With",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Username or email",
    passwordFieldPlaceholder: "Password",
    tapToSignIn: "Login",
    hint: "Hint: you can use any email address and your favorite password :)",
    signUp: "Sign Up"
  },
  signUpScreen: {
    signUpScreenTitle: "Register and Learn with",
    emailFieldLabel: "Email:",
    passwordFieldLabel: "Password:",
    usernameFieldLabel: "Username:",
    nameFieldLabel: "Name:",
    signUp: "Sign Up"
  },
  enrollmentScreen: {
    viewCourseButtonText: "View Course"
  }
}

export default en
export type Translations = typeof en
