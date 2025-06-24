import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Context/ContextShare';

function Header() {
  const navigate = useNavigate();
  const { isAuthToken, SetIsAuthToken } = useContext(isAuthTokenContext);

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('existingUser');
    SetIsAuthToken(false);
    navigate('/');
  };

  return (
    <Navbar bg="light" variant="light" className="shadow-sm py-2 fixed-top">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Navbar.Brand className="d-flex align-items-center">
            <i className="fa-solid fa-layer-group text-primary me-2 fs-4"></i>
            <span className="fw-bold fs-5 text-primary">Student Project Portal</span>
          </Navbar.Brand>
        </Link>

        {isAuthToken ? (
          <button onClick={logout} className="btn btn-outline-primary d-flex align-items-center">
            <i className="fa-solid fa-power-off me-2"></i> Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-outline-primary d-flex align-items-center">
              <i className="fa-solid fa-power-off me-2"></i> Login
            </button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
