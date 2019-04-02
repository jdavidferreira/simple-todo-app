import React, { Component } from 'react'
import axios from 'axios'
import TodoListItem from './TodoListItem'
//import './TodoList.css'

class TodoList extends Component {
  constructor(props) {
    super()

    this.state = {
      todos: []
    }
  }

  componentDidMount = () => {
    this._fetchTodos()
  }

  //call to api
  _fetchTodos = async _ => {
    try {
      const response = await axios.get(
        'https://todo-api-123.herokuapp.com/todo_items'
      )

      if (response) {
        this.setState({
          todos: response.data
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      const text = e.currentTarget.value

      if (text && text.trim().length !== 0) {
        this._saveTodo(text)
      }
      e.currentTarget.value = ''
    }
  }

  //call to api
  _saveTodo = async text => {
    try {
      const response = await axios.post(
        'https://todo-api-123.herokuapp.com/todo_items',
        { title: text }
      )
      if (response) {
        this._fetchTodos()
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleClickTodo = e => {
    const todo = {
      id: e.currentTarget.id,
      title: e.currentTarget.innerText,
      done: e.currentTarget.dataset.done === 'true'
    }

    todo.done = !todo.done

    this._updateTodo(todo)
  }

  //call to api
  _updateTodo = async todo => {
    try {
      const response = await axios.patch(
        `https://todo-api-123.herokuapp.com/todo_items/${todo.id}`,
        todo
      )
      if (response) {
        this._fetchTodos()
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleDelete = e => {
    e.stopPropagation()

    const todo = {
      id: e.currentTarget.parentElement.id
    }

    this._deleteTodo(todo)
  }

  //call to api
  _deleteTodo = async todo => {
    try {
      const response = await axios.delete(
        `https://todo-api-123.herokuapp.com/todo_items/${todo.id}`
      )
      if (response) {
        this._fetchTodos()
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Tareas por hacer:</h1>
        {this._renderList()}
        <input
          type="text"
          id="new-task-btn"
          className="form-control mt-2"
          placeholder="Ingresa una tarea y oprime Enter"
          onKeyPress={this.handleKeyPress}
        />
      </React.Fragment>
    )
  }

  _renderList() {
    if (this.state.todos.length === 0) return <p>There are no todos!</p>

    return (
      <ul className="list-group">
        {this.state.todos.map(t => (
          <TodoListItem
            key={t.id}
            id={t.id}
            title={t.title}
            done={t.done}
            onClickHandler={this.handleClickTodo}
            onDeleteHandler={this.handleDelete}
          />
        ))}
      </ul>
    )
  }
}

export default TodoList
