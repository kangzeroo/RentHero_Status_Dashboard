// Compt for copying as a SelectAdIDs
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Input, Button, Checkbox } from 'antd'
import { changeSelectedIntents } from '../../../actions/intents/intent_actions'


class SelectAdIDs extends Component {

  constructor() {
    super()
    this.state = {
      search_string: '',
      chosen_ads: []
    }
  }

  uniqueSessions(intents) {
    const uniques = []
    intents.filter((i) => i.ad_id).forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.ad_id === i.ad_id) {
          exists = true
        }
      })
      if (!exists) {
        uniques.push(i)
      }
    })
    return uniques
  }

  updateChecked(intent){
		const x = this.state.chosen_ads.filter((c) => {
			return c.ad_id === intent.ad_id
		}).length
		if (x > 0) {
			this.setState({
				chosen_ads: this.state.chosen_ads.filter((c) => {
					return c.ad_id !== intent.ad_id
				})
			})
		} else {
			this.setState({
				chosen_ads: this.state.chosen_ads.concat([intent])
			})
		}
	}

  filterAds() {
    const x = this.props.all_intents.filter((intent) => {
      let match = false
      this.state.chosen_ads.forEach((c) => {
        if (c.ad_id === intent.ad_id) {
          match = true
        }
      })
      return match
    })
    this.props.changeSelectedIntents(x)
  }

	render() {
		return (
			<div id='SelectAdIDs' style={comStyles().container}>
				<h2>Filter Ads</h2>
				<h4>Only 1 filter can apply at a time</h4>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Input.Search placeholder='Filter Ads' value={this.state.search_string} onChange={(v) => this.setState({ search_string: v.target.value })} />
					<Button type='primary' onClick={() => this.filterAds()}>Filter Ads</Button>
				</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
					<Button onClick={() => this.setState({ chosen_ads: this.uniqueSessions(this.props.all_intents) })}>Select All</Button>
					<Button onClick={() => this.setState({ chosen_ads: [] })}>Unselect All</Button>
				</div>
        <br /><br />
        <div style={{ borderBottom: '1px solid #E9E9E9', display: 'flex', flexDirection: 'column' }}>
          {
            this.uniqueSessions(this.props.all_intents).filter((u) => {
              return u.ad_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
            }).map((u) => {
              return (
                <Checkbox key={u.ad_id} checked={this.state.chosen_ads.filter((c) => c.ad_id === u.ad_id).length > 0} onClick={() => this.updateChecked(u)}>{u.ad_id}</Checkbox>
              )
            })
          }
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
SelectAdIDs.propTypes = {
	history: PropTypes.object.isRequired,
  all_intents: PropTypes.array.isRequired,
  changeSelectedIntents: PropTypes.func.isRequired,
}

// for all optional props, define a default value
SelectAdIDs.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SelectAdIDs)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    all_intents: redux.intents.all_intents
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    changeSelectedIntents,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
		}
	}
}
