var defaultState = {
    loading: false,
    error: false,
    todos: [],
    nextId: 21,
    todoText: ""
}
 
const todos = (state = defaultState, action) => {
    switch(action.type){
        case 'REQUEST_TODOS':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVED_TODOS_SUCCESS':
            return {
                loading: false,
                todos: action.data,
                error: false
            }
        case 'RECEIVED_TODOS_ERROR':
                return {
                    loading: false,
                    todos: [],
                    error: action.data
                }
        default: return state
    }
}

export default todos