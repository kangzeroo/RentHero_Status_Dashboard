// Higher Order Compt for initializing actions upon AppRoot load

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getIntentsDistribution } from '../api/intents/intents_api'
import { changeAllIntents, saveUniqueIntents } from '../actions/intents/intent_actions'

// this 'higher order component'(HOC) creator takes a component (called ComposedComponent)
// and returns a new component with added functionality
export default (ComposedComponent) => {
	class AppRootMechanics extends Component {

    componentDidMount() {
			setInterval(() => {
				this.loadIntentDistribution(this.props.node_env, this.props.min_date.toISOString(), this.props.max_date.toISOString(), this.props.chosen_intents)
			}, 120000)
			this.loadIntentDistribution(this.props.node_env, this.props.min_date.toISOString(), this.props.max_date.toISOString(), this.props.chosen_intents)
			this.loadUniqueIntents()
    }

		componentDidUpdate(prevProps, prevState) {
	    if (prevProps.node_env !== this.props.node_env || prevProps.min_date !== this.props.min_date || prevProps.max_date !== this.props.max_date || prevProps.chosen_intents !== this.props.chosen_intents) {
	      this.loadIntentDistribution(this.props.node_env, this.props.min_date.toISOString(), this.props.max_date.toISOString(), this.props.chosen_intents)
	    }
	  }

		loadUniqueIntents() {
			getIntentsDistribution(this.props.node_env)
				.then((intents) => {
					const unique_intents = []
			    intents.forEach((int) => {
			      let exists = false
			      unique_intents.forEach((u) => {
			        if (u.intent_id === int.intent_id) {
			          exists = true
			        }
			      })
			      if (!exists) {
			        unique_intents.push(int)
			      }
			    })
			    console.log(unique_intents)
					this.props.saveUniqueIntents(unique_intents)
				})
				.catch((err) => {
					console.log(err)
				})
		}

		loadIntentDistribution(node_env, min_date, max_date, chosen_intents) {
			getIntentsDistribution(node_env, min_date, max_date, chosen_intents.map((c) => c.intent_id))
	      .then((intents) => {
	        this.props.changeAllIntents(intents)
	      })
	      .catch((err) => {
	        console.log(err)
	      })
		}

		render() {
			// the rendered composed component, with props passed through
			return <ComposedComponent id='AppRootKernal' {...this.props} />
		}
	}

  // defines the types of variables in this.props
  AppRootMechanics.propTypes = {
  	history: PropTypes.object.isRequired,
  }

  // for all optional props, define a default value
  AppRootMechanics.defaultProps = {

  }

	const mapStateToProps = (redux) => {
		return {
			node_env: redux.app.node_env,
			min_date: redux.intents.min_date,
			max_date: redux.intents.max_date,
			chosen_intents: redux.intents.chosen_intents,
		}
	}

	// we nest our custom HOC to connect(), which in itself is a HOC
	// we can actually nest HOC infinitely deep
	return withRouter(
		connect(mapStateToProps, {
			changeAllIntents,
			saveUniqueIntents,
    })(AppRootMechanics)
	)
}

// Pseudo-code demonstrating how to use the higher order component (HOC)
/*
	// In some other location (not in this file), we want to use this HOC...
	import AppRootMechanics	// The HOC
	import Resources		// The component to be wrapped
	const ComposedComponent = AppRootMechanics(Resources);

	// In some render method...
	<ComposedComponent />

	// <ComposedComponent> actually renders the AppRootMechanics class, which renders the composed component
	// This 2 layer method is powerful because when we pass in props to <ComposedComponent> like below:
	<ComposedComponent propA={propA} />
	// we can pass those props into the 2nd layer (composed component) using a correct 'this' reference to the 1st layer
*/
