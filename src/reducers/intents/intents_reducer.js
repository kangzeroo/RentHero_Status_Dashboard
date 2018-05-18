import moment from 'moment'
import {
  CHANGE_CHOSEN_INTENTS,
  CHANGE_ALL_INTENTS,
  CHANGE_SELECTED_DATES,
  SET_UNIQUE_INTENTS,
} from '../../actions/action_types'

const INITIAL_STATE = {
  all_intents: [],
  unique_intents: [],
  chosen_intents: [],
  min_date: moment(),
  max_date: moment(),
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case CHANGE_CHOSEN_INTENTS:
      return {
        ...state,
        chosen_intents: action.payload,
      }
    case CHANGE_ALL_INTENTS:
      return {
        ...state,
        all_intents: action.payload,
      }
    case CHANGE_SELECTED_DATES:
      return {
        ...state,
        selected_dates: action.payload,
      }
    case SET_UNIQUE_INTENTS:
      return {
        ...state,
        unique_intents: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
