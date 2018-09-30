import React from 'react';
import {connect} from 'react-redux'

import { hideSubscribeModal, registerSubscribe } from '../../../../actions/index.jsx'

import { event } from '../../../GAHelper.jsx'

import '../../../../css/Subscribe.css'

class Subscribe extends React.Component {

  constructor(props) {
    super(props);
    this.exitSubscribeClick = this.exitSubscribeClick.bind(this);

    this.state = {email: ''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  exitSubscribeClick(e) {
    this.props.dispatch(hideSubscribeModal())
  }

  handleSubmit(e) {
    console.log("Email: " + this.state.email);

    e.preventDefault();

    event("SUBSCRIBE", "SUBMIT");

    const { dispatch } = this.props
    this.props.dispatch(registerSubscribe(this.state.email))
  }  

  render() {
    const { complete } = this.props

    if (complete) {
      return (
        <div>
          <div styleName="modal-overlay" onClick={this.exitSubscribeClick}></div>
          <div styleName="subscribe-modal">
            <p>Thanks for subscribing!</p>
          </div>
        </div>
       )
    }

    return (
      <div>
        <div styleName="modal-overlay" onClick={this.exitSubscribeClick}></div>
        <div styleName="subscribe-modal">
          <div styleName="header"> 
            <h1>Stay Informed</h1>
            <div styleName="line"></div>
          </div>
          <p>Get notified of data breaches once per week. Stay informed on all the premium features we launch.
          <br/><br/>Plus get free support for a month, just for signing up.</p>
          <div styleName="contact">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Your Email Address" autoComplete='email'/>
              <input styleName="submit" type="submit" value="SUBSCRIBE" />
            </form>
          </div>
        </div>
      </div>
    )  
  }
}

const mapStateToProps = state => {
  return  {complete : state.subscribe.complete}
}

export default connect(mapStateToProps)(Subscribe)