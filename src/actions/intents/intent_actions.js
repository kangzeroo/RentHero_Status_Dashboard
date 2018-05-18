import {
  CHANGE_CHOSEN_INTENTS,
  CHANGE_ALL_INTENTS,
  CHANGE_SELECTED_DATES,
  SET_UNIQUE_INTENTS,
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
      type: CHANGE_ALL_INTENTS,
      payload: allIntents,
    })
  }
}

export const changeSelectedDates = (selectedDates) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SELECTED_DATES,
      payload: selectedDates,
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
