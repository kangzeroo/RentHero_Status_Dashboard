// Compt for copying as a SelectTenantIDs
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


class SelectTenantIDs extends Component {

  constructor() {
    super()
    this.state = {
      search_string: '',
      chosen_tenants: []
    }
  }

  uniqueTenants(intents) {
    const uniques = []
    intents.filter((i) => i.identity_id).forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.identity_id === i.identity_id) {
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
		const x = this.state.chosen_tenants.filter((c) => {
			return c.identity_id === intent.identity_id
		}).length
		if (x > 0) {
			this.setState({
				chosen_tenants: this.state.chosen_tenants.filter((c) => {
					return c.identity_id !== intent.identity_id
				})
			})
		} else {
			this.setState({
				chosen_tenants: this.state.chosen_tenants.concat([intent])
			})
		}
	}

  filterAds() {
    const x = this.props.all_intents.filter((intent) => {
      let match = false
      this.state.chosen_tenants.forEach((c) => {
        if (c.identity_id === intent.identity_id) {
          match = true
        }
      })
      return match
    })
    this.props.changeSelectedIntents(x)
  }

	render() {
		return (
			<div id='SelectTenantIDs' style={comStyles().container}>
				<h2>Filter Tenants</h2>
				<h4>Only 1 filter can apply at a time</h4>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Input.Search placeholder='Filter Tenants' value={this.state.search_string} onChange={(v) => this.setState({ search_string: v.target.value })} />
					<Button type='primary' onClick={() => this.filterAds()}>Filter Tenants</Button>
				</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
					<Button onClick={() => this.setState({ chosen_tenants: this.uniqueTenants(this.props.all_intents) })}>Select All</Button>
					<Button onClick={() => this.setState({ chosen_tenants: [] })}>Unselect All</Button>
				</div>
        <br /><br />
        <div style={{ borderBottom: '1px solid #E9E9E9', display: 'flex', flexDirection: 'column' }}>
          {
            this.uniqueTenants(this.props.all_intents).filter((u) => {
              return u.identity_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
            }).map((u) => {
              return (
                <Checkbox key={u.identity_id} checked={this.state.chosen_tenants.filter((c) => c.identity_id === u.identity_id).length > 0} onClick={() => this.updateChecked(u)}>{u.identity_id}</Checkbox>
              )
            })
          }
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
SelectTenantIDs.propTypes = {
	history: PropTypes.object.isRequired,
  all_intents: PropTypes.array.isRequired,
  changeSelectedIntents: PropTypes.func.isRequired,
}

// for all optional props, define a default value
SelectTenantIDs.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SelectTenantIDs)

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
