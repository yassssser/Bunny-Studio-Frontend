import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/layout/Header'
import Users from './components/Users/Users'

import { Provider } from 'react-redux';
import store from './store';
import EditUser from './components/Users/EditUser';
import AddUser from './components/Users/AddUser';
import AddTask from './components/tasks/AddTask';
import EditTask from './components/tasks/EditTask';
import NotFound from './components/pages/NotFound'

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Header branding="Bunny Studio"></Header>
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/user/add" component={AddUser} />
            <Route exact path="/user/edit/:id" component={EditUser} />
            <Route exact path="/task/edit/:id" component={EditTask} />
            <Route exact path="/user/addTask/:idUser" component={AddTask} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
