import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import { getSuggestions } from '../../../../actions/index.jsx'
import { eventWithValue } from '../../../GAHelper.jsx'

import '../../../../css/Search.css'

class Search extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    this.onSearchKeyUp = this.onSearchKeyUp.bind(this);
    this.onSearchLinkClick = this.onSearchLinkClick.bind(this);

    this.searchValueRef = null;    
    this.setSearchValueRef = element => {
      this.searchValueRef = element;
    };

    this.state = {
      isSearching: false
    };
  }

  triggerSearch(value) {
    // Need this called here for both even when there is no value 
    // in order clear the existing search results.
    this.props.dispatch(getSuggestions(value))

    if (value.length > 0) {
      this.setState({ isSearching: true});    
    }
    else {
      this.setState({ isSearching: false});
    }
  }

  onSearchChange(event) {
    const value = event.target.value;
    this.triggerSearch(value);
  }

  onSearchKeyUp(event) {
    if (event.key == 'Enter') {
      const value = event.target.value;
      this.triggerSearch(value);
    }
  }

  onSearchBtnClick(event) {
    this.triggerSearch(this.searchValueRef.value);
  }

  onSearchLinkClick(result_clicked) {
    eventWithValue("SEARCH", "RESULT_CLICKED", result_clicked);
    this.setState({ isSearching: false});
  }

  render() {
    const { suggestions } = this.props

    const results = suggestions.map((s, index) => (
      <tr key={index} styleName="contentSearchSuggestionRow">
        <td styleName="contentSearchSuggestionEntry">
          <Link to={s.link} onClick={() => this.onSearchLinkClick(s.name)}>{s.name}</Link>
        </td>
      </tr>
    ))

    let error = null;
    let table = null;
    if (this.state.isSearching) {
      if (suggestions.length > 0) {
        eventWithValue("SEARCH", "RESULTS", this.searchValueRef.value)
        
        table = (
          <table styleName="contentSearchSuggestionTable">
            <tbody>
              {results}
            </tbody>
          </table>
        )
      }
      else {
        error = <div styleName = "error"><Link to={`/support/${this.searchValueRef.value}`}>No matches found. Click to contact support. We'd love to help</Link></div>
      }
    } 

    return (
      <div styleName="search">
        <div styleName="search-wrapper">
          <input ref={this.setSearchValueRef} styleName="search-input" placeholder={this.props.placeholder} maxLength="256" onKeyUp={this.onSearchKeyUp} onChange={this.onSearchChange}/>
          <button styleName="search-button" onClick={this.onSearchBtnClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.392 21.039">
            <path id="Shape_2" data-name="Shape 2" className="cls-1" d="M1007.917,336.889a1.957,1.957,0,0,1-2.733.093l-7.1-6.481a1.883,1.883,0,0,1-.593-1.73,7.019,7.019,0,0,1-4.133,1.5,7.09,7.09,0,0,1-5.053-1.852,6.851,6.851,0,0,1-2.256-4.813,6.766,6.766,0,0,1,1.859-4.958,7.13,7.13,0,0,1,9.942-.338,6.848,6.848,0,0,1,1.052,8.962,1.962,1.962,0,0,1,1.806.45l7.106,6.481A1.878,1.878,0,0,1,1007.917,336.889ZM997.972,323.2a4.774,4.774,0,0,0-1.572-3.356,4.973,4.973,0,0,0-6.934.234,4.769,4.769,0,0,0,.276,6.813,4.971,4.971,0,0,0,6.933-.234A4.716,4.716,0,0,0,997.972,323.2Z" transform="translate(-986.039 -316.455)"/>
            </svg>
          </button>
        </div>
        {table}
        {error}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return  {suggestions : state.search.suggestions}
}

export default connect(mapStateToProps)(Search)