// Compt for copying as a SelectSessionIDs
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


class SelectSessionIDs extends Component {

  constructor() {
    super()
    this.state = {
      search_string: '',
      chosen_sessions: []
    }
  }

  uniqueSessions(intents) {
    const uniques = []
    intents.filter((i) => i.session_id).forEach((i) => {
      let exists = false
      uniques.forEach((u) => {
        if (u.session_id === i.session_id) {
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
		const x = this.state.chosen_sessions.filter((c) => {
			return c.session_id === intent.session_id
		}).length
		if (x > 0) {
			this.setState({
				chosen_sessions: this.state.chosen_sessions.filter((c) => {
					return c.session_id !== intent.session_id
				})
			})
		} else {
			this.setState({
				chosen_sessions: this.state.chosen_sessions.concat([intent])
			})
		}
	}

  filterSessions() {
    const x = this.props.all_intents.filter((intent) => {
      let match = false
      this.state.chosen_sessions.forEach((c) => {
        if (c.session_id === intent.session_id) {
          match = true
        }
      })
      return match
    })
    this.props.changeSelectedIntents(x)
  }

	render() {
		return (
			<div id='SelectSessionIDs' style={comStyles().container}>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Input.Search placeholder='Filter Sessions' value={this.state.search_string} onChange={(v) => this.setState({ search_string: v.target.value })} />
					<Button type='primary' onClick={() => this.filterSessions()}>Filter Sessions</Button>
				</div>
        <br /><br />
        <div style={{ borderBottom: '1px solid #E9E9E9', display: 'flex', flexDirection: 'column' }}>
          {
            this.uniqueSessions(this.props.all_intents).filter((u) => {
              return u.session_id.toLowerCase().indexOf(this.state.search_string.toLowerCase()) > -1
            }).map((u) => {
              return (
                <Checkbox key={u.session_id} checked={this.state.chosen_sessions.filter((c) => c.session_id === u.session_id).length > 0} onClick={() => this.updateChecked(u)}>{u.session_id}</Checkbox>
              )
            })
          }
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
SelectSessionIDs.propTypes = {
	history: PropTypes.object.isRequired,
  all_intents: PropTypes.array.isRequired,
  changeSelectedIntents: PropTypes.func.isRequired,
}

// for all optional props, define a default value
SelectSessionIDs.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SelectSessionIDs)

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
