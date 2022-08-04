import '../styles/globals.css'
import { wrapper } from '../appRedux/store'

// test package
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const config = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  AppWebDomain: process.env.REACT_APP_COGNITO_APP_DOMAIN,
  TokenScopesArray: process.env.REACT_APP_COGNITO_GOOGLE_SCOPES,
  RedirectUriSignIn: process.env.REACT_APP_COGNITO_SIGN_IN_REDIRECT_URI,
  RedirectUriSignOut: process.env.REACT_APP_COGNITO_SIGN_OUT_REDIRECT_URI
}

const cognitoAuth = new CognitoAuth(config)

const handleError = (authFunction) => {
  try {
    authFunction
    return true
  } catch (error) {
    console.log("error", error);
    return error
  }
}

const handleSuccess = ({ auth }) => {
  auth.userhandler = {
    onSuccess: result => {
      console.log("success")
    },
    onFailure: result => {
      console.log("fail")
    }
  }
}

const ex = (func) => handleError(func);

const parsedUrl = ({ auth, href }) => {
  console.log("auth", auth)
  console.log("parsedUrl", href)
  ex(auth.parseCognitoWebResponse(href))
}

function MyApp({ Component, pageProps }) {
  console.log("config", config)
  handleSuccess({ auth: cognitoAuth });

  pageProps = {
    ...pageProps,
    auth: cognitoAuth,
    parsedUrl
  }
  console.log(pageProps)
  return (<Component { ...pageProps} />)
}

export default wrapper.withRedux(MyApp)
