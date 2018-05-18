import {
  CHANGE_LANGUAGE,
  CHANGE_NODE_ENV,
} from '../action_types'

// change the language of the app
export const changeAppLanguage = (languageCode) => {
  // dispatch lets you send actions to Redux
  localStorage.setItem('rentburrow_lang', languageCode)
  return (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: languageCode,
    })
  }
}

export const changeNodeEnv = (node_env) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_NODE_ENV,
      payload: node_env,
    })
  }
}
