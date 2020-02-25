var defaultState = {
    todoText: '',
    loading: false,
    error: false,
    todos: [],
    nextId: 21
}
 
const todoReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'REQUEST_TODOS':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVED_TODOS_SUCCESS':
            return {
                ...state,
                loading: false,
                todos: action.data,
                error: false
            }
        case 'RECEIVED_TODOS_ERROR':
                return {
                    ...state,
                    loading: false,
                    todos: [],
                    error: action.data
                }
        case 'CHANGE_TODO_TEXT':
                return {
                    ...state,
                    todoText: action.data
                }
        case 'ADD_TODO':
                return {
                    ...state,
                    todos: [...state.todos, action.data]
                }
        case 'CHANGE_NEXT_ID':
                return {
                    ...state,
                    nextId: action.data
                }
        case 'REMOVE_TODO':
                return {
                    ...state,
                    todos: state.todos.filter((todo, index) => todo.id !== action.data)
                }
        case 'COMPLETE_TODO':
            console.log(action.data)
                return {
                    ...state,
                    todos: action.data
                }
        default: 
            return state
    }
}

export default todoReducer