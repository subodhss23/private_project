import React from 'react';
import {connect} from 'react-redux'

import { event } from '../../../GAHelper.jsx'

import { contactSupport } from '../../../../actions/index.jsx'

// CSS
import '../../../../css/ContactForm.css';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {email: '', company:props.company, desc: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleCompanyChange(event) {
    this.setState({company: event.target.value});
  }

  handleDescChange(event) {
    this.setState({desc: event.target.value});
  }

  handleSubmit(e) {
    console.log("Email: " + this.state.email);
    console.log("Company: " + this.state.company);
    console.log("Desc: " + this.state.desc);

    e.preventDefault();

    event("SUPPORT", "SUBMIT");

    const { dispatch } = this.props
    this.props.dispatch(contactSupport(this.state.email, this.state.company, this.state.desc))
  }

  render() {
    const { complete } = this.props

    if (complete) {
      return (
        <p>
          Talk to you soon!
        </p>
       )
    }

    return (
      <div styleName="contact">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Your Email Address To Contact You" autoComplete='email' required/>
          <input type="text" value={this.state.company} onChange={this.handleCompanyChange} placeholder="Name of the company you want to delete" autoComplete='organization'/>
          <textarea type="text" value={this.state.desc} onChange={this.handleDescChange} placeholder="Tell us how we can help you"/>
          <input styleName="submit" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return  {complete : state.support.complete}
}

export default connect(mapStateToProps)(ContactForm)