import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import { deleteTask } from '../../actions/taskAction'


 class Task extends Component {

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
          }).then(async (result) => {
            if (result.value) {

              await  this.props.deleteTask(id)

              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'the task has been deleted',
                icon: 'success',
                timer : 1500
              })

             // this.props.history.push('/')
             

            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'The task is safe :)',
                icon: 'error',
                timer : 1500
              })
            }
          })

     };

    render() {
      
        const { id, description, state } = this.props.task
        return (
            <>
                    <tr>
                        <td>{description}</td>
                            <td>
                                {
                                    state ? (
                                        <span>
                                            <i className="fa fa-check"
                                                 style={{ cursor: 'pointer', color : 'blue' , fontSize : '20px' }} >
                                            </i> Done
                                        </span>
                                    ) : (
                                        <span>
                                            <i className="fa fa-spinner fa-spin"
                                                 style={{ cursor: 'pointer', color : 'red' , fontSize : '20px' }}>
                                            </i><br/> Not yet
                                        </span> 
                                    )
                                }
                            </td>
                            <td>
                                  <Link to={`task/edit/${id}`} className="btn btn-sm btn-warning">
                                    <i className="fa fa-pencil mx-1"></i>
                                    Edit
                                  </Link>
                                  <button className="btn btn-sm btn-danger m-1" onClick={this.onDeleteClick.bind(this, id)}>
                                    <i className="fa fa-trash mx-1"></i>
                                    Delete
                                  </button>      
                            </td>
                    </tr>
            </>
        )
    }
}


export default connect(null, { deleteTask })(Task);