import React from 'react';

import { event } from '../../../GAHelper.jsx'

// CSS
import '../../../../css/AppSupport.css'

class AppSupport extends React.Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		event("SUPPORT", "CLICK")
	}

	render() {
		return (
			<ul styleName="support">
			{
          this.props.support.map((p, index)  => {
          	if (p.link) {
          		return <li key= {index}><a href={p.link} target="_blank" onClick={this.onClick}>{p.text}</a></li>
          	}
          	else if (p.email) {
          		return <li key= {index}><b>Email</b>: {p.email}</li>
          	}
          	else if (p.phone) {
          		return <li key= {index}><b>Phone</b>: {p.phone}</li>
          	}
          })
      }
      </ul>
		)
	}
}

export default AppSupport