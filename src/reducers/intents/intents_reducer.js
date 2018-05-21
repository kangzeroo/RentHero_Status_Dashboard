import moment from 'moment'
import {
  CHANGE_CHOSEN_INTENTS,
  SET_ALL_INTENTS,
  CHANGE_SELECTED_DATES,
  SET_UNIQUE_INTENTS,
  CHANGE_SELECTED_INTENTS,
} from '../../actions/action_types'

const INITIAL_STATE = {
  all_intents: [],
  selected_intents: [],
  unique_intents: [],
  chosen_intents: [],
  min_date: moment().subtract(1, 'days'),
  max_date: moment().add(1, 'hours'),
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case SET_ALL_INTENTS:
      return {
        ...state,
        all_intents: action.payload.map((int) => {
          return {
            ...int,
            ad_id: int.ad_id || 'no_ad_id',
            session_id: int.session_id || 'no_session_id',
            identity_id: int.identity_id || 'no_tenant_identity_id'
          }
        }),
        selected_intents: action.payload.map((int) => {
          return {
            ...int,
            ad_id: int.ad_id || 'no_ad_id',
            session_id: int.session_id || 'no_session_id',
            identity_id: int.identity_id || 'no_tenant_identity_id'
          }
        })
      }
    case CHANGE_SELECTED_DATES:
      return {
        ...state,
        min_date: action.payload.min_date,
        max_date: action.payload.max_date
      }
    case SET_UNIQUE_INTENTS:
      return {
        ...state,
        unique_intents: action.payload,
        chosen_intents: action.payload,
      }
    case CHANGE_CHOSEN_INTENTS:
      return {
        ...state,
        chosen_intents: action.payload,
      }
    case CHANGE_SELECTED_INTENTS:
      return {
        ...state,
        selected_intents: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
