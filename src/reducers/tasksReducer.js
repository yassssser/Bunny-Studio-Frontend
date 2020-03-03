
const initState = {
    tasks: [],
    task : {}
};
 
export default function(state = initState, action){
    switch(action.type){
        case 'GET_tasks' :
          return {
           ...state,
           tasks : action.payload          
        } 
        case 'GET_task':
          return {
            ...state,
            task : action.payload
        }
        case 'ADD_task':
          return {
            ...state,
            tasks : [action.payload, ...state.tasks]
        }
        case 'UPDATE_task':
            return {
              ...state,
              tasks : state.tasks.map(task => task.id === action.payload.id ? (task = action.payload) : task )
            }
        case 'DELETE_task':
          return {
            ...state,
            tasks : state.tasks.filter(task => task.id !== action.payload)
          }
        default : {
            return state
        }
    }
}