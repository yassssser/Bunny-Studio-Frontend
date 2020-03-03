import React, { Component } from 'react'

import { connect } from 'react-redux';

import TextInputGroup from '../layout/TextInputGroup'
import { getUser, updateUser } from '../../actions/userAction'

 class EditUser extends Component {

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getUser(id)
    } 

    componentWillReceiveProps(nextProps,nextState){
        const { name } = nextProps.user;
        this.setState({
          name
        })
    }

    state = {
        name: '',
        errors: {}
    }; 

    onSubmit =async (e) => {
        e.preventDefault();
    
        const { name } = this.state;
    
        // Check For Errors
        if (name === '') {
          this.setState({ errors: { name: 'Name is required' } });
          return;
        }
    
        const { id } = this.props.match.params;
    
        const updatedUser = {
          id,
          name
        };

        //// UPDATE User ////
    
        await this.props.updateUser(updatedUser);
    
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
              <div className="card-header">Edit User</div>
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
                                value="Update User"
                                className="btn btn-warning btn-block"
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
      user : state.users.user
    }
}

export default connect(mapStateToProps, { getUser, updateUser })(EditUser);