import React from 'react';
import ComingSoon from './ComingSoon.jsx';
import Home from './home/Home.jsx';
import BulkDelete from './bulk/BulkDelete.jsx';
import Article from './article/Article.jsx';
import Support from './support/Support.jsx';
import { Switch, Route } from 'react-router-dom'

// CSS
import '../../../css/Main.css'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/delete-all' component={BulkDelete}/>
      <Route exact path='/subscribe' render={()=><Home subscribe={true}/>}/>      
      <Route path='/support/:company?' component={Support}/>      
      <Route exact path='/:app/:section' component={Article}/>
    </Switch>
  </main>
)

export default Main