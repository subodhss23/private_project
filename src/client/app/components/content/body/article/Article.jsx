import React from 'react';
import {Helmet} from "react-helmet";

// Components
import AppSupport from './AppSupport.jsx';
import References from './References.jsx';
import Instructions from './Instructions.jsx';

// Data
import {getArticle} from '../../../API.js'

// CSS
import styles from '../../../../css/Article.css'

const Article = (props) => {
  if(process.env.REACT_APP_ENV === "production") {
    window.Intercom("update");
  }
  
  // black people meet for instance has the url has black_poeple_meet/:section
  // so we need to revert back to proper form in order to match properly.
  const app = getArticle(props.match.params.app.split('-').join(' '))
  const section = props.match.params.section
  
  if (!app) {
    return <div>Sorry, but the app was not found</div>
  }

  let support = null;
  if ("support" in app) {
  	support = <AppSupport support={app.support}/>
  }

  let references = null;
  if ("references" in app) {
  	references = <References 
      list={app.references} 
      title="People also search for"
      references = {true} 
      />;
  }

  let breaches = null;
  if ("breaches" in app) {
    breaches = <References 
      list={app.breaches} 
      title="List of data breaches"
      breaches = {true}
      />;
  }

  let relatedAccounts = null;
  if ("relatedAccounts" in app) {
    relatedAccounts = <References 
      list={app.relatedAccounts} 
      title="Similar accounts you may want to delete"
      relatedAccounts = {true}
      />;
  }

  let instructions = null;
  let description = '';
  let title = '';
  let url = '';
  let keywords = '';
  let social_image = (app.social_image != null) ? app.social_image[0].url : null;
  if ("instructions" in app) {
    app.instructions.map((ins, k)  => {
      if (keywords.length != 0) {
        keywords += ', ';
      }
      keywords += app.name + " " + ins.header;
      if (ins.id == section) {
        instructions = <Instructions instructions={app.instructions} index={k}/>

        if (ins.header) {
          title = ins.title; 
        }
        if (ins.link) {
          url = window.location.href;
        }
        if (ins.before) {
          description +=  ins.before;
        }
        // if (ins.thingsToRemember) {
        //   for (var i = 0; i < ins.thingsToRemember.length; i++) {
        //     description +=  " " + ins.thingsToRemember[i];
        //   }      
        // }
        if (ins.after) {
          description +=  " " + ins.after;
        }
      }
    })  	
  }

  return (
    <article>      
      <Helmet
        title={title}
        meta={
          [
            {
              name: 'title', content: title
            },
            {
              name: 'description', content: description
            },
            {
              name: 'url', content: url
            },
            {
              name: 'medium', content: 'article'
            },
            {
              name: 'keywords', content: keywords
            },            
            {
              property: 'og:description', content: description
            },            
            {
              property: 'og:title', content: title
            },
            {
              property: 'og:url', content: url
            },
            {
              property: 'og:type', content: 'article'
            }, 
            {
              property: 'og:image', content: social_image
            },           
            {
              property: 'og:image:width', content: '1296'
            },
            {
              property: 'og:image:height', content: '729'
            }
          ]
        }
        script={
          [
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Article',
                'name': app.name,
                'publisher': {
                  '@type': 'Organization',
                  'name': 'DeleteMyData',
                  'logo': {
                    '@type': 'imageObject',
                    'url': 'https://deletemydata.io/icon.png'
                  }
                }
              })
            }
          ]
        }    
      />     
      {instructions}  
    </article>
  )
}

export default Article
