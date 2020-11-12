import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
//import Todos from './Todos.js';
import SignUp from './SignUp.js'
import Login from './Login.js'
import Home from './Home.js'
import Todos from './Todos.js'
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME'),
    token: localStorage.getItem('TOKEN')
  }

  handleMyTokenChange = (myToken, userName) => {
    this.setState({
      token: myToken,
      username: userName
    });

    localStorage.setItem('TOKEN', myToken);
    localStorage.setItem('USERNAME', userName);
  }

  render() {
    const { token, username } = this.state;
    return (
      <div>
        <Router>
          <ul>
            {token && <div>welcome, {username}!!!</div>}
            {token && <Link to="/todos"><div>todos</div></Link>}
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            <button onClick={() => this.handleMyTokenChange('', '')}>logout</button>
          </ul>

          <Switch>
            <Route exact path='/home' render={(routerProps) => <Home
              {...routerProps} />}
            />
            <Route exact path='/login' render={(routerProps) => <Login
              handleMyTokenChange={this.handleMyTokenChange}
              {...routerProps} />}
            />
            <Route
              exact path='/signup'
              render={(routerProps) => <SignUp
                {...routerProps} handleMyTokenChange={this.handleMyTokenChange} />}
            />
            <PrivateRoute
              token={this.state.token}
              exact path='/todos'
              render={(routerProps) => <Todos
                {...routerProps} token={this.state.token} />}
            />

            {/* //   notice that we pass the token here! This is required!
            <PrivateRoute
              exact
              path='/todos'
              token={this.state.token}
              render={(routerProps) => <Todos
                {...routerProps} />} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}