import React from 'react';
import {Link} from 'react-router-dom';

function Navigation(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

              <div className="navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Search <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Favorits">Favorits</Link>
                  </li>
                </ul>
              </div>
            </nav>
        )
}

export default Navigation;