import axios from 'axios'
import authHeaders from '../authHeaders'
import { STATUS_MS } from '../API_URLS'

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

export const getSessionsForAd = ({ ad_id, node_env }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/sessions_for_ad`, { ad_id, node_env }, authHeaders())
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

export const getSessionsForLandlord = ({ landlord_id, node_env }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/sessions_for_landlord`, { landlord_id, node_env }, authHeaders())
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

export const getSessionsForTenant = ({ tenant_id, node_env }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/sessions_for_tenant`, { tenant_id, node_env }, authHeaders())
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

export const getSessionsForLead = ({ lead_id, node_env }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${STATUS_MS}/sessions_for_lead`, { lead_id, node_env }, authHeaders())
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
