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
    this.state = {
      todos: [
        {id: 0, title: "Make dinner tonight!", completed: false},
        {id: 1, title: "Fold the laundry.", completed: false},
        {id: 2, title: "Learn to make a React app!", completed: true}
      ],
      nextId: 21
    };

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
    // this.setState({
    //     todos: this.state.todos.filter((todo) => todo.id !== id)
    //   });
    this.props.dispatch(actions.removeTodo(id));
  }

  completeTodo(id) {
    // let currentTodo1 = this.state.todos.find(todo => todo.id === id)
    // currentTodo1.completed = !currentTodo1.completed

    // this.setState({
    //   ...this.state.todos,
    //   currentTodo1
    // });

    const { todos } = this.props

    let currentTodo = todos.find(todo => todo.id === id),
      newTodos = todos.filter((todo) => todo.id !== id)
    currentTodo.completed = !currentTodo.completed
    // newTodos = [...newTodos, currentTodo]
    console.log(currentTodo)
    console.log(newTodos)


    // this.props.dispatch(actions.completeTodo(newTodos));
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
                return <TodoItem todo={todo} key={todo.id} removeTodo={this.removeTodo} completeTodo={this.completeTodo} />
                // return <TodoItem todo={todo} key={todo.id} />
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
    todos: state.todos.todos,
    loading: state.todos.loading,
    error: state.todos.error
  }
})(App);