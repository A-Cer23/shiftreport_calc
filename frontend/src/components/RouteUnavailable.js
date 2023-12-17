import React, { Component } from 'react';

class RouteUnavailable extends Component {
  render() {
    return (
      <div className='text-light'>
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
    );
  }
}

export default RouteUnavailable;