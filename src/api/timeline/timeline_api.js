import axios from 'axios'
import authHeaders from '../authHeaders'
import { STATUS_MS } from '../API_URLS'

export const getTimelineIntents = ({ session_id, ad_id, identity_id, node_env }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/intent_timeline_logs`, { session_id, ad_id, identity_id, node_env }, authHeaders())
      .then((data) => {
        console.log(data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const getMessagesForSession = ({ session_id, node_env }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/session_messages`, { session_id, node_env }, authHeaders())
      .then((data) => {
        console.log(data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
