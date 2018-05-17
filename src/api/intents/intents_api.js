import axios from 'axios'
import authHeaders from '../authHeaders'
import { STATUS_MS } from '../API_URLS'

export const getIntentsDistribution = (a, b, c) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/intent_distributions`, { a, b, c }, authHeaders())
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
