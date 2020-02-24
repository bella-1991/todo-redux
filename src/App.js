import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './actions/actions'
import './App.css';
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.initialiseTodos())
  }

  addTodo(todoText) {
    let todos = this.state.todos.slice();
    todos.push({id: this.state.nextId, title: todoText, completed: false});
    this.setState({
      todos: todos,
      nextId: ++this.state.nextId
    });
  }

  removeTodo(id) {
    this.setState({
        todos: this.state.todos.filter((todo, index) => todo.id !== id)
      });
  }

  completeTodo(id) {
    let currentTodo = this.state.todos.find(todo => todo.id === id)
    currentTodo.completed = !currentTodo.completed

    this.setState({
      ...this.state.todos,
      currentTodo
    });
  }

  render() {
    const { todos } = this.props

    return (
      <div className="App">
        <div className="todo-wrapper">
          <Header />
          <TodoInput />
          <ul>
            {
              todos && todos.map((todo) => {
                return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo} completeTodo={this.completeTodo}/>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default connect((state, props) => {
  return {
    todos: state.todo.todos,
    loading: state.todo.loading,
    error: state.todo.error,
    next: state.todo.nextId
  }
})(App);