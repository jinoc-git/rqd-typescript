import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to={'/'} style={{ marginRight: '50px' }}>
        TODO
      </Link>
      <Link to={'/movies'}>MOVIES</Link>
    </div>
  );
};

export default Header;
