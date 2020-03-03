import React, { Component } from 'react'

import TextInputGroup from '../layout/TextInputGroup'
import { connect } from 'react-redux'
import { addTask } from '../../actions/taskAction'


 class AddTask extends Component {

    state = {
        description : '',
        state : false,
        errors: {}
    }

    onSubmit =async (e) => {
        e.preventDefault();
   // console.log(this.state);
    
        let { description, state } = this.state;
        
        
        if (description === '') {
          this.setState({ errors: { description: 'description is required' } });
          return;
        }

        const { idUser } = this.props.match.params;

        const newTask = {
            description,
            state,
            userId : `api/users/${idUser}`
        };
    
        //// SUBMIT the Task ////
    
       await  this.props.addTask(newTask)
    
        // Clear State
        this.setState({
          description: '',
          errors: {}
        });
    
        this.props.history.push('/');
      };


    onChange = e => this.setState({ [e.target.name]: e.target.value });
    handleChecked(){
        this.setState({ state: !this.state.state })
    }

    render() {
        
        const { description, state, errors } = this.state
        return (
            <div className="col-md-9 mx-auto mt-5">
            <div className="card mb-3">
              <div className="card-header">Add Task</div>
                 <div className="card-body">
                    <div className="col-md-8 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <TextInputGroup
                                label="Description"
                                name="description"
                                placeholder="Please write the task description"
                                value={description}
                                onChange={this.onChange}
                                error={errors.description}
                            />
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value={state} id="defaultCheck1" onChange={this.onChange} onClick={this.handleChecked.bind(this)} />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    state of the task
                                </label>
                            </div>
                            <input
                                type="submit"
                                value="Add Task"
                                className="btn btn-success btn-block mt-3"
                            />
                        </form>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}

export default connect(null, { addTask })(AddTask)