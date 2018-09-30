import React from 'react';
import {connect} from 'react-redux'

import { registerSubscribe } from '../../../actions/index.jsx'
import { event } from '../../GAHelper.jsx'

// CSS
import '../../../css/ComingSoon.css'

class ComingSoon extends React.Component {

  constructor(props) {
    super(props);

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
    e.preventDefault();
    event(this.props.category, "SUBMIT");
    const { dispatch } = this.props
    this.props.dispatch(registerSubscribe(this.state.email))
  }

  render() {

    if(process.env.REACT_APP_ENV === "production") {
      window.Intercom("update");
    }

    const { complete } = this.props

    let contact = (
        <div styleName="contact">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Your Email Address" autoComplete='email'/>
            <input styleName="submit" type="submit" value="SUBSCRIBE" />
          </form>
        </div>
      )

    if (complete) {
      contact = (
        <div styleName="contact">
          <p>Thanks for subscribing!</p>
        </div>
      )
    }

    return (
      <section styleName="coming-soon">
        <div styleName="header">
          <h1>{this.props.header}</h1>
          <div styleName="line"></div>
        </div>

        <div styleName="text">
          <span>Thanks for showing interest in </span>
          <b>{this.props.feature}</b>
          <span> feature. We're working on it. Ping us in the chat on the right to tell us what you'd like to see.</span>
          <br/><br/>
          <span>Get free support for a month, just for signing up.</span>
        </div>

        {contact}
      </section>
    )
  }
}


const mapStateToProps = state => {
  return  {complete : state.subscribe.complete}
}

export default connect(mapStateToProps)(ComingSoon)
