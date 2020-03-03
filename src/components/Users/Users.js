import React, { Component } from 'react'

import User from './User'
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userAction'

 class Users extends Component {

    componentDidMount(){
        this.props.getUsers()
    }

    render() {
        const { users } = this.props;
        
        return (
            <div className="container mt-5">
                <h1 className="display-4 text-center mb-2">
                     <span className="text-success">Users</span> List
                </h1>
                <div className="card card-body mt-3">
                    <ul className="list-group">
                        {
                            users.map(user => {
                                return (
                                    <User key={user.id}
                                        user={user}></User>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      users : state.users.users
    }
}


export default connect(mapStateToProps, { getUsers })(Users);