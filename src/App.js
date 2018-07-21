import React, { Component } from 'react'
import {graphql, QueryRenderer} from 'react-relay'

import environment from './relay/Environment'
import UserAddedSubscription from './relay/UserAddedSubscription'
import logo from './logo.svg'
 
import './App.css'

class App extends Component {
  componentWillMount() {
    if (this.subscription) {
      this.subscription.dispose()
    }
    this.subscription = UserAddedSubscription()
  }
  
  renderUserList = users => users.map(user => 
    <div key={user.node._id} >{user.node.name}</div>
  )
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderUserList(this.props.users)}
       </div>
    );
  }
}

const AppQueryRenderer = () => 
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery {
        users(
          first: 6
        ) @connection(key: "App_users") {
          pageInfo {
            hasNextPage
            endCursor
          }
          count
          edges {
            node {
              _id
              id
              name
            }
          }
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }
      return <App users={props.users.edges} />
    }}
  />

export default AppQueryRenderer