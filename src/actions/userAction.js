import axios from 'axios';

const userUrl = 'http://127.0.0.1:8000/api/users'

export const getUsers = () => async dispatch =>{

    try {
        const res =await axios.get(userUrl);
        
        dispatch({
            type : 'GET_users',
            payload : res.data['hydra:member']
          })
    } catch (error) { 
        alert(error) 
    }
}

export const getUser = (id) => async dispatch =>{

    try {
        const res =await axios.get(`${userUrl}/${id}`);

        dispatch({
          type : 'GET_user',
          payload : res.data
         })
    } catch (error) {
        alert(error)
    }
}

export const addUser = (user) =>async dispatch => {

    try {
        const res = await axios.post(`${userUrl}`, user);
     dispatch({
        type : 'ADD_user',
        payload : res.data
      })
    } catch (error) {
        alert(error)
    }
}

export const deleteUser = (id) => dispatch => {
  
    axios.delete(`${userUrl}/${id}`)
    .then(res => {
       dispatch({
           type : 'DELETE_user',
           payload : id 
        })
    })
    .catch(err => {
        alert(err)
    })
}

export const updateUser = (user) =>async dispatch => {

    try {
        const res = await axios.put(`${userUrl}/${user.id}`, user);

     dispatch({
        type : 'UPDATE_user',
        payload : res.data
      })
    } catch (error) {
        alert(error)
    }
}

export const getUserTask = (id) => dispatch => {
  
    axios.delete(`${userUrl}/${id}/user_tasks`)
    .then(res => {
       dispatch({
           type : 'GET_user_tasks',
           payload : id 
        })
    })
    .catch(err => {
        alert(err)
    })
}

// export const deleteTask = (id) => dispatch => {
  
//     axios.delete(`http://127.0.0.1:8000/api/user_tasks/${id}`)
//     .then(res => {
//        dispatch({
//            type : 'DELETE_task',
//            payload : id 
//         })
//     })
//     .catch(err => {
//         alert(err)
//     })
// }