import React, { Component } from 'react'

import { connect } from 'react-redux';
import { deleteUser } from '../../actions/userAction'

import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import Task from '../tasks/Task';

import { getTasks } from '../../actions/taskAction'


 class User extends Component {

  componentDidMount(){
    this.props.getTasks()
}

  state = {
    showUsersTasks : false
  }

    onDeleteClick = id => {
        // add sweet alert for the delete
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it! ',
            cancelButtonText: ' No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
                this.props.deleteUser(id)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'the user has been deleted, with all his tasks.',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'The user is safe :)',
                'error'
              )
            }
          })
     };

    render() {
        const { id, name, userId } = this.props.user
        const { showUsersTasks } = this.state
        return (
            <>
                <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
                    <h5>{name}</h5>
                    <div>
                    <span className="text-primary " >
                      {
                        showUsersTasks ? (
                              <button 
                              className="btn btn-warning"
                              onClick={()=>{
                                this.setState({
                                  showUsersTasks : !this.state.showUsersTasks
                                })
                              }}> 
                            <i className="fa fa-eye-slash mx-2"
                                style={{ cursor: 'pointer' }}
                                >
                            </i>
                            Hide Tasks
                        </button>
                        ) : (
                           <button 
                                  className="btn btn-primary"
                                  onClick={()=>{
                                    this.setState({
                                      showUsersTasks : !this.state.showUsersTasks
                                    })
                                  }}> 
                                <i className="fa fa-eye mx-2"
                                    style={{ cursor: 'pointer' }}
                                    >
                                </i>
                                See Tasks
                            </button>
                        )
                      }
                             
                        </span>
                        <span className="mx-2" >
                            <Link to={`user/edit/${id}`}>
                                <i className="fa fa-pencil"
                                    style={{ cursor: 'pointer', color : 'orange' , fontSize : '25px' }}></i>
                            </Link>
                        </span>
                        <span className="text-danger">
                            <i className="fa fa-trash"
                                style={{ cursor: 'pointer', fontSize : '25px'  }}
                                onClick={this.onDeleteClick.bind(this, id)}
                            ></i>
                        </span>
                    </div>
                </li>
                { showUsersTasks ? (
                    <div className="col-md-8 mx-auto">
                      <div className="text-center my-2">
                        <Link to={`user/addTask/${id}`} className="btn btn-primary">
                            <i className="fa fa-plus-circle mr-1"></i>
                          Add Task
                        </Link>
                      </div>
                      <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                          <tr>
                              <th>Task Name</th>
                              <th>State</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                            <tbody>
                              {
                                userId.map(task =>{
                                    return (
                                      task ? (
                                      <Task key={task.id}
                                            task={task}>
                                      </Task> ) : (
                                        <div className="alert alert-info">No task found</div>
                                      )
                                    )
                                })
                              }
                            </tbody>
                        </table>
                   </div>
                  ) : null }
                
          </>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    tasks : state.users.userId
  }
}

export default connect(mapStateToProps , { getTasks, deleteUser })(User);