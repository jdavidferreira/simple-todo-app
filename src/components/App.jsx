import React, { Component } from 'react'
import './App.css'

import TodoList from './TodoList'

class App extends Component {
  render() {
    return (
      <main className="container">
        <TodoList />
      </main>
    )
  }
}

export default App
