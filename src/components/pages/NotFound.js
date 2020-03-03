import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="col-md-6 mx-auto mt-4">
      <h1 className="display-4">
        <span className="text-danger">404</span> Page Not Found
      </h1>
      <p className="lead">Sorry, that page does not exist</p>
      <Link to='/' className="btn btn-info">
          <i className="fa fa-arrow-left mx-2"></i>
          Back to Home
      </Link>
    </div>
  );
};
