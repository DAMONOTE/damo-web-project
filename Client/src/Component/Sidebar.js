import React from 'react';
import { Route,BrowserRouter as Router, Link,Switch, Redirect } from "react-router-dom";
import Editor from './Editor'
import PostList from './PostList'
import Post from './Post'
import CardPosts from './CardPosts'
import '../Component/Sidebar.css'

function Sidebar (){
    return (
      <Router>
        <div className="sidenav">
          <Link to="/Posts">POST</Link>
          <Link to="/Editor">EDITOR</Link>
          <Link to="/Cards">Card Test</Link>
        </div>
        <div id="main">
          <Switch>
            <Route path="/Editor" component={Editor} />
            <Route path="/Posts" component={PostList} />
            <Route path="/Cards" component={CardPosts} />
            <Route path="/Post/:id" component={Post} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    );
}
  
export default Sidebar;