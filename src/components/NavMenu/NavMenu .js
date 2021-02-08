import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';

export default function NavMenu(){

    return(
        <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">

        <NavLink 
        to='/' 
        activeClassName={styles.active}
        exact
        className='mr-3'
        >
        Home
        </NavLink>
        <NavLink
         to='/about'
         activeClassName={styles.active}
         exact
         className='mr-3'
          >
          About us
          </NavLink>
        <NavLink
         to='/contact'
         activeClassName={styles.active}
         exact
         className='mr-3'
         >
         Contact us
         </NavLink>

        </Nav>
      </Navbar>
    );
}; 