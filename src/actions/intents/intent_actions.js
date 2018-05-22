import {
  CHANGE_CHOSEN_INTENTS,
  SET_ALL_INTENTS,
  CHANGE_SELECTED_DATES,
  SET_UNIQUE_INTENTS,
  CHANGE_SELECTED_INTENTS,
  CHANGE_SESSION_CONVO,
} from '../action_types'


export const changeChosenIntents = (chosenIntents) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_CHOSEN_INTENTS,
      payload: chosenIntents,
    })
  }
}

export const changeAllIntents = (allIntents) => {
  return (dispatch) => {
    dispatch({
      type: SET_ALL_INTENTS,
      payload: allIntents,
    })
  }
}

export const changeSelectedDates = ({ min_date, max_date }) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SELECTED_DATES,
      payload: { min_date, max_date },
    })
  }
}

export const saveUniqueIntents = (uniques) => {
  return (dispatch) => {
    dispatch({
      type: SET_UNIQUE_INTENTS,
      payload: uniques,
    })
  }
}

export const changeSessionConvo = (sessionConvo) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SESSION_CONVO,
      payload: sessionConvo,
    })
  }
}

export const changeSelectedIntents = (intents) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SELECTED_INTENTS,
      payload: intents
    })
  }
}
