import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Link className="btn btn-primary mx-3" to="/register">REGISTER</Link>
      <Link className="btn btn-secondary mx-3" to="/login">LOGIN</Link>
    </div>
  );
};

export default Home;