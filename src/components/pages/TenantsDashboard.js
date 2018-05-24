// Compt for copying as a TenantsDashboard
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'

class TenantsDashboard extends Component {

	render() {
		return (
			<div id='TenantsDashboard' style={comStyles().container}>
				<iframe
					src={`
						https://search-renthero-intents-mfb4bx6dwwpbqxdssfg2ocbcum.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/54b5c4a0-5f24-11e8-ac6f-c752a838516e?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-24h,mode:quick,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:3,i:'1',w:6,x:0,y:0),id:b13907d0-5e8b-11e8-ac6f-c752a838516e,panelIndex:'1',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'2',w:6,x:6,y:0),id:'16d1fb60-5f2c-11e8-ac6f-c752a838516e',panelIndex:'2',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'3',w:6,x:0,y:3),id:aa8107b0-5f2d-11e8-ac6f-c752a838516e,panelIndex:'3',type:visualization,version:'6.2.2'),(gridData:(h:3,i:'4',w:6,x:6,y:3),id:'98ae3780-5f8a-11e8-ac6f-c752a838516e',panelIndex:'4',type:visualization,version:'6.2.2')),query:(language:lucene,query:''),timeRestore:!f,title:'Tenants+Analysis',viewMode:view)
					`}
					height='1000px'
					width='100%'>
				</iframe>
			</div>
		)
	}
}

// defines the types of variables in this.props
TenantsDashboard.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
TenantsDashboard.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(TenantsDashboard)

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
