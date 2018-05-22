import axios from 'axios'
import authHeaders from '../authHeaders'
import { STATUS_MS } from '../API_URLS'

export const getSessionMessages = (sessionID) => {
  console.log('hit')
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/session_messages`, { session_id: sessionID }, authHeaders())
      .then((data) => {
        console.log(data)
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
