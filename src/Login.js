import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await this.setState({ loading: true })
    const user = await request
      .post(`https://nameless-cove-11254.herokuapp.com/auth/signin`)
      .send(this.state)

    await this.setState({ loading: false })
    //we need to send the changed user and token name
    this.props.handleMyTokenChange(user.body.token, user.body.email);
    this.props.history.push('/todos');
  }
  render() {
    const { email, password, loading } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Your personalized Login Page</h2>
          <label>
            Email:
            <input onChange={(e) => this.setState({ email: e.target.value })}
              value={email} />
          </label>
          <label>
            Password:
            <input onChange={(e) => this.setState({ password: e.target.value })}
              value={password} type="password" />
          </label>
          {
            loading
              ? 'MAGIC LOGIN LOADING SPINNER'
              :
              <button>
                Login already
          </button>
          }
        </form>
      </div>
    )
  }
}
