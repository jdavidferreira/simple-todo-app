import React, { Component } from 'react'
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class TodoListItem extends Component {
  render() {
    return (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer' }}
        id={this.props.id}
        data-done={this.props.done}
        onClick={this.props.onClickHandler}
      >
        {this.props.done ? <s>{this.props.title}</s> : this.props.title}
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this.props.onDeleteHandler}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    )
  }
}

export default TodoListItem
