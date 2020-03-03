import axios from 'axios';

const taskUrl = 'http://127.0.0.1:8000/api/user_tasks'


export const getTasks = () => async dispatch =>{

    try {
        const res =await axios.get(taskUrl);
        dispatch({
            type : 'GET_tasks',
            payload : res.data['hydra:member']
          })
    } catch (error) { 
        alert(error) 
    }
}

export const getTask = (id) => async dispatch =>{

    try {
        const res =await axios.get(`${taskUrl}/${id}`);

        dispatch({
          type : 'GET_task',
          payload : res.data
         })
    } catch (error) {
        alert(error)
    }
}

export const addTask = (task) =>async dispatch => {

    try {
        const res = await axios.post(`${taskUrl}`, task);
     dispatch({
        type : 'ADD_task',
        payload : res.data
      })
    } catch (error) {
        alert(error)
    }
}


export const updateTask = (task) =>async dispatch => {

    try {
        const res = await axios.put(`${taskUrl}/${task.id}`, task);

     dispatch({
        type : 'UPDATE_task',
        payload : res.data
      })
    } catch (error) {
        alert(error)
    }
}

export const deleteTask = (id) => dispatch => {
  
    axios.delete(`${taskUrl}/${id}`)
    .then(res => {
       dispatch({
           type : 'DELETE_task',
           payload : id 
        })
    })
    .catch(err => {
        alert(err)
    })
}