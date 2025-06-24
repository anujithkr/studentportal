import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Context/ContextShare';

function Header() {
    const navigate = useNavigate();
const {isAuthToken , SetIsAuthToken}= useContext(isAuthTokenContext)
    const logout = () => {
        if (sessionStorage.getItem('token')) {
            sessionStorage.removeItem('token');
        }
        if (sessionStorage.getItem("existingUser")) {
            sessionStorage.removeItem("existingUser");
        }
        SetIsAuthToken(false)
        navigate('/'); 
    };

    return (
        <>
            <Navbar className="bg-info" >
                <Container>
                    <Link style={{ textDecoration: 'none' }} to={'/'}>
                        <Navbar.Brand href="#home" style={{ display: 'flex', alignItems: 'center' }}>
                            <i className="fa-solid fa-layer-group fa-2x" style={{ marginRight: '10px' }}></i>
                            <h2 style={{ margin: 0 }}>Student Project Portal</h2>
                        </Navbar.Brand>
                    </Link>
                    {
                        isAuthToken?
                          <button onClick={logout} className='btn btn-info'>
                        <i className="fa-solid fa-power-off fa-2x"></i> LOGOUT
                    </button>
                    :
                    <Link to={"/login"}><button className='btn btn-info'>
                        <i className="fa-solid fa-power-off fa-2x"></i> LOGIN
                    </button>
                    </Link>


                    }

                  
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
