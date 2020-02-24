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

function getAllTodos(dispatch) {
    dispatch(requestTodos())

    axios.get('https://jsonplaceholder.typicode.com/users/1/todos').then((resp) => {
        dispatch({ type: 'RECEIVED_TODOS_SUCCESS', data: resp.data })
    }).catch((err) => {
        dispatch({ type: 'RECEIVED_TODOS_ERROR', data: err.message })
    })
}