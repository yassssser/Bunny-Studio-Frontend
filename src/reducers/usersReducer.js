
const initState = {
    users: [],
    user : {}
};
 
export default function(state = initState, action){
    switch(action.type){
        case 'GET_users' :
          return {
           ...state,
           users : action.payload
        }
        case 'GET_user':
          return {
            ...state,
            user : action.payload
        }
        case 'ADD_user':
          return {
            ...state,
            users : [action.payload, ...state.users]
        }
        case 'DELETE_user':
          return {
            ...state,
            users : state.users.filter(user => user.id !== action.payload)
          }
          case 'UPDATE_user':
            return {
              ...state,
              users : state.users.map(user => user.id === action.payload.id ? (user = action.payload) : user )
            }
        default : {
            return state
        }
    }
}