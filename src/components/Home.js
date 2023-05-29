import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let auth = JSON.parse(sessionStorage.getItem('loginPayload'));

  const history = useNavigate();

  const handleLogout = () => {
    sessionStorage.setItem('loginPayload', JSON.stringify(null));
    history('/');
  };

  return (
    <div>
      <>
        <Navbar bg="light" expand={'md'} className="mb-3">
          <Container fluid>
            <Navbar.Brand onClick={() => history('/dashboard')}>
              Vehicle Service Management
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className={`flex-grow-1 pe-3 ${
                    auth ? 'justify-content-between' : 'justify-content-end'
                  }`}
                >
                  {auth && (
                    <div className="navlinks-card ">
                      <NavLink to={'/vehiclemanagement'}>
                        Vehicle Management
                      </NavLink>

                      <NavLink to={'/servicemanagement'}>
                        Service Management
                      </NavLink>
                    </div>
                  )}
                  <div className="navlinks-card-two ">
                    {!auth ? (
                      <div>
                        <NavLink className="btn btn-primary m-2" to={'/signup'}>
                          SignUp
                        </NavLink>
                        <NavLink className="btn btn-primary m-2" to={'/'}>
                          Login
                        </NavLink>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => history('/changePassword')}
                        >
                          Change password
                        </button>
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    </div>
  );
};

export default Home;
