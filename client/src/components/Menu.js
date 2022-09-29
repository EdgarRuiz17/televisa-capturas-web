import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Logo from '../assets/logo-televisa.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowDown} from '@fortawesome/free-solid-svg-icons';

export const Menu = () => {
  return (
    <>
    <div class="d-flex flex-column flex-shrink-0 bg-light" style={{ width:"4.5rem" , zIndex: "5000"}}>
      <a href="/" class="d-block p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
        <div className='text-center'>
          <img class="mb-2" src={Logo} alt="" width="45" height="50" />
        </div>
        <span class="visually-hidden">Icon-only</span>
      </a>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <Link href="#" class="nav-link active py-3 border-bottom rounded-0" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right" to="/menu/home">
          <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        <li>
          <Link href="#" class="nav-link py-3 border-bottom rounded-0" title="Importar Excel" data-bs-toggle="tooltip" data-bs-placement="right" to="/menu/import">
          <FontAwesomeIcon icon={faArrowDown} />
          </Link>
        </li>
        
      </ul>
      
    </div>
    <Outlet />
    </>
  )
}
