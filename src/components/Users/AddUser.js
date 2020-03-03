import React, { Component } from 'react'

import TextInputGroup from '../layout/TextInputGroup'
import { addUser } from '../../actions/userAction'
import { connect } from 'react-redux'



 class AddUser extends Component {
    state = {
        name: '',
        errors: {}
      }

      onSubmit =async (e) => {
        e.preventDefault(); 
    
        const { name } = this.state;
    
        // Check For Errors
        if (name === '') {
          this.setState({ errors: { name: 'Name is required' } });
          return;
        }
    
        const newUser = {
          name
        };
    
        //// SUBMIT User ////
    
       await this.props.addUser(newUser)
    
        // Clear State
        this.setState({
          name: '',
          errors: {}
        });
    
        this.props.history.push('/');
      };

      onChange = e => this.setState({ [e.target.name]: e.target.value });
      
    render() {
        const { name, errors } = this.state;
        return (
            <div className="col-md-9 mx-auto mt-5">
            <div className="card mb-3">
              <div className="card-header">Add User</div>
                 <div className="card-body">
                    <div className="col-md-8 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <TextInputGroup
                                label="Name"
                                name="name"
                                placeholder="Please write the user full name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                            <input
                                type="submit"
                                value="Add User"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}

export default connect(null, { addUser })(AddUser);