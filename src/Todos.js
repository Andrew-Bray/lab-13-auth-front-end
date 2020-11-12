import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
  state = {
    todos: [],
    myTodo: '',
    loading: false

  }

  componentDidMount = async () => {
    await this.fetchTodos()
  }

  fetchTodos = async () => {
    await this.setState({ loading: true })
    const response = await request.get(`https://nameless-cove-11254.herokuapp.com/api/todos`)
      .set('Authorization', this.props.token)
    await this.setState({ todos: response.body, loading: false })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    await request.post(`https://nameless-cove-11254.herokuapp.com/api/todos/`)
      .set('Authorization', this.props.token)
      .send({
        todo: this.state.myTodo,
      })

    await this.fetchTodos();
    await this.setState({ myTodo: '' });
  }

  handleCompletion = async (myId) => {

    await request.put(`https://nameless-cove-11254.herokuapp.com/api/todos/${myId}`)
      .set('Authorization', this.props.token)

    await this.fetchTodos();
  }

  render() {
    return (
      <div>
        The magic page of all of your todos
        <form onSubmit={this.handleSubmit}>
          <label>
            Todo:
            <input
              value={this.state.myTodo}
              onChange={(e) => this.setState({ myTodo: e.target.value })}
              placeholder="Add Task"
            />
          </label>
          <button>
            Add a todo
          </button>
        </form>
        {
          this.state.loading ?
            `patience enough! We're getting your list` :
            this.state.todos.map(todo =>
              <div key={`${todo.id}${Math.random()}`}
                style={{ textDecoration: todo.is_done ? 'line-through' : 'none' }}>
                Task: {todo.todo}
                {
                  todo.is_done ? '' :
                    <button onClick={() => { this.handleCompletion(todo.id) }}>
                      Completed!
                  </button>
                }
              </div>)
        }
      </div>
    )
  }
}
