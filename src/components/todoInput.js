import React from 'react';
import './styles/todoInput.css';
import { connect } from 'react-redux';

import * as actions from '../actions/actions'

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.todoText};

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(e) {
    // this.setState({value: e.target.value});
    this.props.dispatch(actions.changeTodoText(e.target.value))
  }

  addTodo() {
    const { todoText, nextId } = this.props,
      todo = { id: nextId, title: todoText, completed: false },
      newNext = nextId + 1;
      
    // Ensure a todo was actually entered before submitting
    if (todoText.length > 0) {
      this.props.dispatch(actions.addTodo(todo))
      this.props.dispatch(actions.changeTodoText(''))
      this.props.dispatch(actions.changeNextId(newNext))
    }
  }

  render() {
    const { todoText } = this.props

    return (
      <div>
        <input type="text" value={todoText} onChange={this.handleChange} />
        <button className="btn btn-primary" onClick={() => this.addTodo()}>Submit</button>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    todoText: state.todos.todoText,
    nextId: state.todos.nextId
  }
})(TodoInput)