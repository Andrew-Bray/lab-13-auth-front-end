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
    const { token } = this.props;
    await this.setState({ loading: true })
    const { body } = await request.get(`https://nameless-cove-11254.herokuapp.com/api/todos`)
      .set('Authorization', token)
    await this.setState({ todos: body, loading: false })
  }

  handleSubmit = async (e) => {
    const { token } = this.props;
    const { myTodo } = this.state;
    e.preventDefault();

    await request.post(`https://nameless-cove-11254.herokuapp.com/api/todos/`)
      .set('Authorization', token)
      .send({
        todo: myTodo,
      })

    await this.fetchTodos();
    await this.setState({ myTodo: '' });
  }

  handleCompletion = async (myId) => {
    const { token } = this.props;
    await request.put(`https://nameless-cove-11254.herokuapp.com/api/todos/${myId}`)
      .set('Authorization', token)

    await this.fetchTodos();
  }

  render() {
    const { loading, todos, myTodo } = this.state;
    return (
      <div>
        The magic page of all of your todos
        <form onSubmit={this.handleSubmit}>
          <label>
            Todo:
            <input
              value={myTodo}
              onChange={(e) => this.setState({ myTodo: e.target.value })}
              placeholder="Add Task"
            />
          </label>
          <button>
            Add a todo
          </button>
        </form>
        {
          loading ?
            `patience enough! We're getting your list` :
            todos.map(todo =>
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
