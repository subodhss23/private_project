import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Slideshow from './Slideshow.jsx'
import T2Remember from './T2Remember.jsx'
import ActionButton from './ActionButton.jsx';
import Feedback from './Feedback.jsx';
import QuestionAnswerModule from './QuestionAnswerModule.jsx';
import Search from '../home/Search.jsx';

import '../../../../css/Instructions.css'

class Instructions extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.beginWalkthru = this.beginWalkthru.bind(this);
  }

  beginWalkthru() {
    console.log("beginWalkthru")
    var editorExtensionId = "nnmjgnendbfeeajmjoolibbecobgagaf";
    chrome.runtime.sendMessage(editorExtensionId, {url: "https://www.amazon.com", start: true}, function(res) {
      let url = res.response;
      if (url != null) {
        window.open(url, '_blank');
      }
      else {
        console.log('url is null');
      }
    })
  }

  onClick(e) {
    if (document.getElementById('deletemydata-helps-u')) {
      console.log("Installed already");
      this.beginWalkthru(); 
    }
    else {
      console.log("Installing extension");
      chrome.webstore.install(undefined, this.beginWalkthru, function(err) {
        console.log(err);
      });
    }
  }  

  render() {

    let shortcutItems = []; 
    if (this.props.instructions.length > 1) {
              
      this.props.instructions.map((ins, k)  => {
        let item = ins.header.replace(/\s+/g, '-').toLowerCase();;
        shortcutItems.push(
          <li key= {k}><a href={ins.link}>{ins.header}</a></li>
        )
      })
    }

    return (
	     <div className="instructions">
        <div styleName="shortcut">
          <ul>
          {shortcutItems}
          </ul>
        </div> 
        {
        	this.props.instructions.map((ins, k)  => {
            if (this.props.index == k) {
              let howTo = null, howtoiOS = null, howtoWeb= null, t2r = null;
              let showTab = false;
              let showAction = (ins.action) ? true : false;

              if (ins.thingsToRemember) {
                t2r = <T2Remember t2r={ins.thingsToRemember}/>;
              }

              if (ins.ios && ins.website) {
                showTab = true;
              }

              if (ins.ios) {                        
                howtoiOS = (
                  <Slideshow slides={ins.ios.slides} 
                    before={ins.before}
                    after={ins.after}              
                    steps={ins.ios.steps}/>
                )
              }

              if (ins.website) {                        
                howtoWeb = (
                  <Slideshow slides={ins.website.slides} 
                    before={ins.before}
                    after={ins.after}              
                    steps={ins.website.steps}/>
                )
              }

              if (showTab) {
                howTo = (
                    <Tabs>
                      <TabList>
                        <Tab>Website</Tab>
                        <Tab>iOS</Tab>
                      </TabList>
                      <TabPanel>
                        {howtoWeb}
                      </TabPanel>
                      <TabPanel>
                        {howtoiOS} 
                      </TabPanel>
                    </Tabs> 
                  )
              }
              else if (ins.ios) {
                howTo = howtoiOS;
              }
              else if (ins.website) {
                howTo = howtoWeb;
              }

              let actionButton = null;
              if (showAction) {
                actionButton = (
                  <li>
                    <ActionButton action={ins.action} />                
                  </li>
                  )
              }

              let shareButton = (
                  <li>Share: <a onClick={this.onClick}>walk.me/amazon</a></li>
                )

              let contentInMigration = null;
              if (ins.qnAnswers) {
                contentInMigration = (
                    <div styleName="q-a">
                        <h2>Questions & Answers</h2>
                        <QuestionAnswerModule qandas={ins.qnAnswers}/>
                    </div>
                  )
              }
              else {
                contentInMigration = t2r;
              }

              return (
                <div key = {k} styleName="how-to-module" id={ins.id}>
                  <section>      
                    <h1>{ins.title}</h1>
                  </section>
                  {howTo}                
                  <div>
                    {contentInMigration}
                  </div>   
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

export default Instructions