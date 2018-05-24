// Compt for copying as a AdsDashboard
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'

class AdsDashboard extends Component {

	render() {
		return (
			<div id='AdsDashboard' style={comStyles().container}>
				<iframe
					src={`https://search-renthero-intents-mfb4bx6dwwpbqxdssfg2ocbcum.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/0cd24a90-5f2f-11e8-ac6f-c752a838516e?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,interval:'1h',mode:quick,timezone:America%2FNew_York,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:3,i:'1',w:6,x:0,y:3),id:'427da210-5e04-11e8-ac6f-c752a838516e',panelIndex:'1',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'2',w:6,x:6,y:0),id:'8b86b0e0-5f2c-11e8-ac6f-c752a838516e',panelIndex:'2',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'3',w:6,x:6,y:3),id:'16d1fb60-5f2c-11e8-ac6f-c752a838516e',panelIndex:'3',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'4',w:6,x:0,y:0),id:'1e8e0c80-5f23-11e8-ac6f-c752a838516e',panelIndex:'4',type:visualization,version:'6.2.2')),query:(language:lucene,query:''),timeRestore:!f,title:'Ads+Analysis',viewMode:view)`}
					height='1000px'
					width='100%'>
				</iframe>
			</div>
		)
	}
}

// defines the types of variables in this.props
AdsDashboard.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
AdsDashboard.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(AdsDashboard)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

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
