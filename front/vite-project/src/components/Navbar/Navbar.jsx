import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';


function NavBar() {

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const name = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  /* useEffect(() => {
      if (!loggedIn) {
        navigate('/login');
      } 
    }, [loggedIn, navigate]); */

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
  };

  const handleLogin = () => {
    console.log("login");
    navigate('/login');
  }

  return (
    <div>
          <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
              <Link to="/"><button><span>HOME</span></button></Link>
              {loggedIn && <Link to="/mis-turnos"><button><span>MIS RESERVAS</span></button></Link>}
              {loggedIn && <Link to="/schelude"><button><span>PROGRAMAR RESERVA</span></button></Link>}
              <Link to="/aboutus"><button><span>SOBRE NOSOTROS</span></button></Link>
              <Link to="/contact"><button><span>CONTACTANOS</span></button></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                  {loggedIn ? (
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                      Bienvenido: {name}
                    </h5>
                  ) : (
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                      Inicie Sesion
                    </h5>
                  )}
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                    {loggedIn ? (
                      <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                          <button onClick={handleLogout}>Logout</button>
                        </h5>
                      ) : (
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                          <button onClick={handleLogin}>Login</button>
                        </h5>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

    </div>
  )
}

export default NavBar
