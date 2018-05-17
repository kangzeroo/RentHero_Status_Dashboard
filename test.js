const axios = require('axios')

const authHeaders = () => {
  return {
    headers: {}
  }
}

const getDomainMappings = (node_env, fileName) => {
  const p = new Promise((res, rej) => {
    axios.get(`https://s3.amazonaws.com/renthero-ai-mappings/knowledge_domains/${node_env.toLowerCase()}/${fileName}`, authHeaders())
      .then((data) => {
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

const domains = [
  { key: 1, name: 'geo', fileName: 'geo_intents.json' },
  { key: 2, name: 'searching', fileName: 'searching_intents.json' },
  { key: 3, name: 'meta', fileName: 'meta_intents.json' },
  { key: 4, name: 'general', fileName: 'general_intents.json' },
  { key: 5, name: 'tours', fileName: 'tours_intents.json' },
  { key: 6, name: 'specific_struc', fileName: 'specific_struc_intents.json' },
  { key: 7, name: 'specific_unstruc', fileName: 'specific_unstruc_intents.json' },
  { key: 8, name: 'init', fileName: 'init_intents.json' },
]

const getAllDomainIntents = (node_env) => {
  console.log('Grabbing all domain intents...')
  const p = new Promise((res, rej) => {
    const x = domains.map((domain) => {
      return getDomainMappings(node_env, domain.fileName)
    })
    Promise.all(x).then((data) => {
      // console.log(data)
      let allIntents = []
      data.map((domain) => {
        allIntents = allIntents.concat(domain.relationships)
      })
      console.log(allIntents)
    }).catch((err) => {
      console.log(err)
      rej(err)
    })
  })
  return p
}

getAllDomainIntents('development')
