import axios from 'axios'
import authHeaders from '../authHeaders'
import { STATUS_MS } from '../API_URLS'

export const getIntentsDistribution = (obj) => {
  console.log(obj)
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/intent_distributions`, obj, authHeaders())
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
https://2dc5fcd1.ngrok.io/intent_distributions

{
	// "min_date": "2018-04-17T13:51:33+00:00",
	// "max_date": "2018-06-17T13:51:33+00:00",
	// "intents": ["us-east-1:90170b10-491a-4a19-8faf-2144e2ba0f35", "42b315ed-7eaa-41ba-9b1c-2d501e0c0b4a", "0f2b8ad5-e932-49a3-a848-6149be3ef74f"],
	// "ad_id": "d5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb"
}
