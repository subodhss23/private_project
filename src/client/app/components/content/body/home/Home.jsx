import React from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import TopSites from './TopSites.jsx'
import Search from './Search.jsx'
import Subscribe from './Subscribe.jsx'
import { showSubscribeModal } from '../../../../actions/index.jsx'

import '../../../../css/Home.css'

import {topApps} from '../../../API.js'
import { eventWithLabel } from '../../../GAHelper.jsx'


class Home extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.subscribe) {
      this.props.dispatch(showSubscribeModal())
    }
  }

  onBulkDeleteClick() {
    eventWithLabel("HOME", "CLICK", "BULK_DELETE_LINK");
  }

  render() {

    if(process.env.REACT_APP_ENV === "production") {
      window.Intercom("update");
    }
    
    const { showSubscribe } = this.props

    let subscribe = null;
    if (this.props.showSubscribe) {
      subscribe = <Subscribe />
    }

    return (
      <div styleName="home">
      	<Helmet>
          <title>Simplest way to delete your data</title>
        	<meta name="description" content="Learn how to delete you data from anywhere, both offline and online. Easy, step-by-step, set of instructions with illustrations."/>
          <meta name="keywords" content="how to delete, step-by-step instructions, want to delete, close my account, delete permananently, deactivate account, disable account"/>
    		</Helmet>
        {subscribe}
        <section styleName="s1" id="search">      
          <h1>Simplest way to delete your online accounts</h1>
          <div styleName="line"></div>
          <Search placeholder="Search company"/>
          <b><Link to="/delete-all" styleName="delete-all" onClick={() => this.onBulkDeleteClick()}>
            I Want To Delete Multiple Accounts
          </Link></b>
        </section>
        <section styleName="s2" id="top-apps">    
          <h1>Top Apps</h1>
          <div styleName="line"></div>
          <TopSites sites={topApps} />
        </section>
        <section styleName="s3" id = "about">    
          <h1>What is DeleteMyData</h1>
          <div styleName="line"></div>
          <h3>We help you find out what information is collected and how to delete it </h3>
          <div styleName="usp">
            <div styleName="block">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="33" height="34" viewBox="0 0 33 34">
                <image xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB7FBMVEUAAADySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjzW1v1d3f6urr6tLTyS0vzUFD4o6P+8PD////+7e3/+/v7y8v0YWH6srL5r6/zUlL0amr0Y2P4mJj/+fn0Xl74mpr94eHzXV3zU1P96en+7u7+8fH81tb+8vL0X1/ySkr2gID//v71cnL0YGD3kJD4lpb3i4vySUn3j4/1dnb2h4fzVVX5qan//Pz5pqb8zs7+6+v4oqL1b2/5qKj++Pj7wcH5paX82Nj3iIj0a2v0ZWX5qqr94+P95eX6vb3zVlb7w8PyTk7zWVn+7OzzUVH+9vb7zc31bm72gYH5pKT93d0AAAD5WiC4AAAAV3RSTlMAEQJCjcPr7seQSAULcuHpflPj7GQGmaoMCrvKFLjIpv5aBNbnW94BIjpogaC3xuDb8trxxN2etWV8HjfCa88J/FGDmgOvva7ADogIQ9lSY9XccDGz8IA7/EteAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAbRJREFUOMtjYEADjEwMOAETMwsrW3h4ODsHJxc3FnkeXr5wBOAXYERXICgUjgqERVDkRcXCMYG4BEKBpFQ4NiAtAzdBNhw7kJOEqmAJxwXkIQqYFeAiEZFR0ZExSEoUQQqUlGHc2Lj4hMSkhOQUhAoVkGtV4dzUhLT0jMys7PgchBJeoAoOGCcyITcnLyk/vKCwCKFCTZ1BA84pLikojSwrDw+vqKxCKNFk0IIxqxNqauvArPqkBoQKbQYdGLMxoSm8HsxqLmxBqNBl0IMxm1vboKzM7CyECn0GAzi7vQMaEp1JXQgVhgyIOI9M6AbTFT299UiBxmCEYPcl9E+YOGly9pQIJAXGDCZIvIqpCQkJ8dOmz5iEEDNlMEOJqoicmbNyZidMLYeLmDNYYETonLkJCfPgPEsGKwUMJfOBdi2AcawZGGwwVIQvTEiARY0RKA1jqohpT1gEZdqCsokdppLw6jkQms8elIQ0HcJxAkdIMnTCqcAZmpJdXHEocBOFZwd3rAo8PBFZysULM1TCzbxR8qWPL5q8kB961hb1D0CSDwySZMACgi1DDELDDdVkwzTVEaIAsVEun4pYY0gAAAAASUVORK5CYII=" width="33" height="34"/>
              </svg>
              <div styleName="text">
                <h2>Easy Search</h2>
                <br/>
                <p styleName="desc">
                  Quickly search for anything you want to delete. 
                  Reach companies by email or phone.
                  Know how to delete from web or app.
                  Know about privacy and data collection.
                  Single click delete.
                </p>
              </div>
            </div>
            <div styleName="block">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="33" height="34" viewBox="0 0 33 34">
                <image xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABp1BMVEUAAADySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEj2enr95eX93d30ZWXyTk77w8P+7Oz4oqLySkr+8fH////80ND4mpr1bm7++Pj81tb4oKD1cnL2hIT+8vL1bW3zU1P80tL/+fn5r6/zWVnzVlbyTEzzVVX//f393Nz82tr/+/v+8PD2fn72gID1c3P//v71dHT1dnbzUVH1cXH5sLD3lZX3k5P0X1/5paX0Xl4AAAD/mfW0AAAAW3RSTlMAMXyz2+/x3riAOgEGYtLcbgpD2eJSA4j+nAiuvg6tvYKZ/FACz+EJU2vB2h02ZJ21xN3yxuCgt2iBIjvH31t0BNfnDI6muci8yhSrDeTrc+l/EkKNw+6QSwUR9a45OgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAF+SURBVDjLhZRnW8IwFIWviKgMFQfugSKiuPdAHLgH7hkHMuICFcGJW1z4p22FpAVaOF9yevI+uX3SewvAKUWSKk1DsvSMTLkC4qVUZSFO2TnqWCA3D0UrvyBqX1NYhOJUXMKrUIqEVFZOT6hAwqpURogqJCZtGJBXixKohgV0teIA0tcxhAElUj1DNNCnnd29fXa1HdgdJDMCNNKbcLowPmTNEcb4mKRN0EyPcJ5gfMoaN0N4SCqBFq7m2bn9gl29lz4/DVuhjfdaXlvEXHFZOxhRYslAn4RAIE0CdEAn9dc2Lr+5Ja4Luml6d88RgQfieqCXpo/4idhn7CK2D/op8YJf38LunXdjAwAmijgw9nuCwY9PjN0kG2S63sxV/8IRfdNoiPm2wyMc8hMK+HyB0C8NRi3/gyDQ50TmcBuOiQLjZBgmRIBJOnjqKUFgeoY3UloBYHYuai4N8zH7VlXsaFsW+H2wuLQs8H/QrayuWZndddPG5haISrGtiUn+AE46NEMXzeVJAAAAAElFTkSuQmCC" width="33" height="34"/>
              </svg>
              <div styleName="text">
              <h2>Support</h2>
                <br/>
                <p styleName="desc">
                  Contact support when you can't find it in search.
                  We're here to help you. Our agents will contact the company for you to get your data deleted.
                </p>
              </div>
            </div>
            <div styleName="block">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="33" height="34" viewBox="0 0 33 34">
                <image xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABy1BMVEUAAADySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjzWlr95eX3jY3////zVlbzWVn1eXn5rKz+9vb939/zV1f6vLz95OT3iIj+7u74mpr2gYH6s7P6v7/7wcH1bGz7w8P+7Oz7x8f0Z2fzVVXzW1v/+vr1bm7+8fH94eH//f3zT0///Pz0Zmb809P1dXX96en+8PD0ZGT4np70a2v0YmL0YGD4n5/zXV395ub/+/v1cnL5p6f2g4P82trySkr8zs781dX4mJj82NjzU1P5paX//v4AAAAz1xsDAAAAW3RSTlMAAhEFR5DH7uvDjUJ+6eFyC2TkUwyqmQYUyrwKyLmmjln+Q+fXBFsB3jokgGi3ot/J8tvx2t21n3xlNR/ZxWtUCdBQ/Duag72wAw6/rgibiVLjRHDc1WO48LMyo6CrVAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAHmSURBVDjLdZNnQxNBEIYnoIgaiWCJGBVQMCA2IvYCSFEEbBTLQiaXkAJpBjQKUQOK0kIIEJK/697t7pXknA9z877z7F7bATCGpQL+H5UHDlYdIoRUHz5y1GLSr7AeI1rU2I6XArXVxBh1Jwz9k6dIeZy2a8CZemIWZx0CcJwj5nFe7HJBZ05OTU1qqoEBjTrAjTTcqmy6qDzlJaY8ktc3jf5AwI/TPq/kUczmFkrYGBCUV4dm5HImJNdBxb4M4GxlBM6GI5LYXYqEZ1Gp6gHauIlR43tEGUGuQLsgYkYixomrcE0QcbUpfaIpzonrcEMQCfWT4BzNCU7chA5BzNP0+Qshya/4jZbznHCBWLmwSNNcinz/gT9lvbjAzwHc4kQ6RdMSLv/C34pOpZnfCbc5sYJJmv8g/lVkEleYXwV3OLGKa8plnck1XGXFXbgnHmRjU/85Njd4cR8eCC+DWxqwhRlePQR4JNwgZkWZ5f+NkMf03z5RF25jmBVh3BZeFyW6a4TK7eAu3Tyzizs5bvUog/NUu/0eYj6PuCd0bx87hv0asl8oFgv7qhzgJ9n+jJjH80ExDi+GTIFh3UiNvCzvN70aNMzl6zclQOfb0tF2jI7p+uMTdigPZ1v7u9YO8t71wfpRZ/8DSH47bJq1UjYAAAAASUVORK5CYII=" width="33" height="34"/>
              </svg>
              <div styleName="text">
                <h2>Be More Secure</h2>
                <br/>
                <p styleName="desc">
                  Your security is our priority. 
                  Our goal is to keep you educated on all things related to privacy and data collection.
                </p>
              </div>
            </div>        
            <div styleName="block">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="33" height="34" viewBox="0 0 33 34">
                <image xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABp1BMVEUAAADySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEjySEj2enr95eX93d30ZWXyTk77w8P+7Oz4oqLySkr+8fH////80ND4mpr1bm7++Pj81tb4oKD1cnL2hIT+8vL1bW3zU1P80tL/+fn5r6/zWVnzVlbyTEzzVVX//f393Nz82tr/+/v+8PD2fn72gID1c3P//v71dHT1dnbzUVH1cXH5sLD3lZX3k5P0X1/5paX0Xl4AAAD/mfW0AAAAW3RSTlMAMXyz2+/x3riAOgEGYtLcbgpD2eJSA4j+nAiuvg6tvYKZ/FACz+EJU2vB2h02ZJ21xN3yxuCgt2iBIjvH31t0BNfnDI6muci8yhSrDeTrc+l/EkKNw+6QSwUR9a45OgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAF+SURBVDjLhZRnW8IwFIWviKgMFQfugSKiuPdAHLgH7hkHMuICFcGJW1z4p22FpAVaOF9yevI+uX3SewvAKUWSKk1DsvSMTLkC4qVUZSFO2TnqWCA3D0UrvyBqX1NYhOJUXMKrUIqEVFZOT6hAwqpURogqJCZtGJBXixKohgV0teIA0tcxhAElUj1DNNCnnd29fXa1HdgdJDMCNNKbcLowPmTNEcb4mKRN0EyPcJ5gfMoaN0N4SCqBFq7m2bn9gl29lz4/DVuhjfdaXlvEXHFZOxhRYslAn4RAIE0CdEAn9dc2Lr+5Ja4Luml6d88RgQfieqCXpo/4idhn7CK2D/op8YJf38LunXdjAwAmijgw9nuCwY9PjN0kG2S63sxV/8IRfdNoiPm2wyMc8hMK+HyB0C8NRi3/gyDQ50TmcBuOiQLjZBgmRIBJOnjqKUFgeoY3UloBYHYuai4N8zH7VlXsaFsW+H2wuLQs8H/QrayuWZndddPG5haISrGtiUn+AE46NEMXzeVJAAAAAElFTkSuQmCC" width="33" height="34"/>
              </svg>
              <div styleName="text">
                <h2>Ask the community</h2>
                <br/>
                <p styleName="desc">
                  Want to know more about what tools others are using to protect themselves?
                  We have an amazing community on <a href="https://www.facebook.com/groups/deletemydata/" target="_blank"> facebook </a> to help you.              
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return  {showSubscribe : state.home.show}
}

export default connect(mapStateToProps)(Home)
