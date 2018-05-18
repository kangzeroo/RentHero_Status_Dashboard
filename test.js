const domains = ['GEO', 'SEARCHING']
const chosenIntents = []

this.props.intents.forEach((intent) => {
  let exists = false
  domains.forEach((dom) => {
    if (intent.intent_name.toUpperCase().includes(dom)) {
      exists = true
    }
  })
  if (!exists) {
    chosenIntents.push(intent.intent_id)
  }
})
console.log(domains)
this.setState({
  domains: domains
}, () => console.log(this.state))
