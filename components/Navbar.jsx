import React,{useEffect} from 'react'
import Link from 'next/link'

export default function Navbar({user}) {
    //esta funcion lo que hace es ayudarnos con el error de bootstrap
    useEffect(()=>{
        if(typeof document !== undefined){
            require('bootstrap/dist/js/bootstrap')
        }
    },[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/" legacyBehavior>
            <a className="navbar-brand">Navbar</a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" legacyBehavior>
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/formulario" legacyBehavior>
                  <a className="nav-link">Crear</a>
                </Link>
              </li>
              {user ? 
              <li className="nav-item">
                <button onClick={() => auth.signOut()}>
                  Sign Out
                </button>
              </li> : 
              <li className="nav-item">
              <Link href="/login" legacyBehavior>
                <a className="nav-link">Sign in</a>
              </Link>
            </li>
              }
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

