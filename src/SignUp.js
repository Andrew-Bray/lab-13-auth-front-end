import React, { Component } from 'react'
import request from 'superagent';

export default class SignUp extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const user = await request
      .post(`https://nameless-cove-11254.herokuapp.com/auth/signup`)
      .send(this.state);

    console.log(user.body);
  }
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
          <button>
            Sign up, why don'cha
            </button>
        </form>
      </div>
    )
  }
}
