import axios from 'axios'
import { ActionTypes as types } from '../constants/constants'

export function initialiseTodos() {
    return(dispatch) => { 
        getAllTodos(dispatch)
    }
}

export function requestTodos() {
    return {
        type: 'REQUEST_TODOS'
    }
}

export function changeTodoText(value) {
    return {
        type: 'CHANGE_TODO_TEXT',
        data: value
    }
}

export function addTodo(payload) {
    return {
        type: 'ADD_TODO',
        data: payload
    }
}

export function changeNextId(value) {
    return {
        type: 'CHANGE_NEXT_ID',
        data: value
    }
}

export function removeTodo(id) {
    return {
        type: 'REMOVE_TODO',
        data: id
    }
}

export function completeTodo(todo) {
    return {
        type: 'COMPLETE_TODO',
        data: todo
    }
}

function getAllTodos(dispatch) {
    dispatch(requestTodos())

    axios.get('https://jsonplaceholder.typicode.com/users/1/todos').then((resp) => {
        dispatch({ type: 'RECEIVED_TODOS_SUCCESS', data: resp.data })
    }).catch((err) => {
        dispatch({ type: 'RECEIVED_TODOS_ERROR', data: err.message })
    })
}