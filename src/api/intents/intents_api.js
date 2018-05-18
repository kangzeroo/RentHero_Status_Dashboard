import axios from 'axios'
import authHeaders from '../authHeaders'
import { STATUS_MS } from '../API_URLS'

export const getIntentsDistribution = (node_env, min_date, max_date, intents) => {
  const params = {
  	"min_date": min_date || "2018-04-17T13:51:33+00:00",
  	"max_date": max_date || "2018-06-17T13:51:33+00:00",
    "node_env": node_env || "staging",
    "intents": intents || []
  }
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/intent_distributions`, params, authHeaders())
      .then((data) => {
        console.log(data.data)
        res(data.data.intents.filter((int) => int.intent_name))
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
