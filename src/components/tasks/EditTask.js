import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTask, updateTask } from '../../actions/taskAction'
import TextInputGroup from '../layout/TextInputGroup'


 class EditTask extends Component {

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getTask(id)
    }

    componentWillReceiveProps(nextProps,nextState){
        const { description, state } = nextProps.task;
        this.setState({
            description,
            state
        })
    }

    state = {
        description : '',
        state : false,
        errors: {}
    }

    onSubmit =async (e) => {
        e.preventDefault();
    
        const { description, state } = this.state;
    
        // Check For Errors
        if (description === '') {
          this.setState({ errors: { name: 'Description is required' } });
          return;
        }
    
        const { id } = this.props.match.params;
    
        const updatedTask = {
          id,
          description,
          state
        };

        //// UPDATE Task ////
    
        await this.props.updateTask(updatedTask);
    
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
              <div className="card-header">Edit Task</div>
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
                                value="Edit Task"
                                className="btn btn-warning btn-block mt-3"
                            />
                        </form>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      task : state.tasks.task
    }
}

export default connect(mapStateToProps, { getTask, updateTask })(EditTask)