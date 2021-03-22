import React from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';


function NavMenu({ isAuthenticated }){

    return(
        <Navbar bg="dark" variant="dark">
        <Nav className={`${styles.navBar} "mr-auto`}>

        {
        isAuthenticated &&
        <NavLink 
          to='/' 
          activeClassName={styles.active}
          exact
          className='mr-3'
          >
        Home
        </NavLink>
        }

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
         className='mr-1'
         >
         Contact us
         </NavLink>
         

        {
          isAuthenticated ? 
          <Button 
          variant='link'
          >
          Log out 
          </Button> :
          <>
          <NavLink
          to='/login'
          activeClassName={styles.active}
          exact
          className='mr-3 ml-3'
          >
          Login
          </NavLink>

          <NavLink
          to='/registration'
          activeClassName={styles.active}
          exact
          >
          Register
          </NavLink>
          </>
        }

        </Nav>
      </Navbar>
    );
}; 

const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.isAuthenticated
  }
  };
  
  export default connect(mapStateToProps)(NavMenu); 