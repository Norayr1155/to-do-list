import React ,{useEffect} from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';
import {logout} from '../../helpers/auth';
import {getUserInfo} from '../store/actions';


function NavMenu({ isAuthenticated ,getUserInfo,name,surname}){

  useEffect(()=>{
    if(isAuthenticated){
      getUserInfo()
    }
  },[getUserInfo,isAuthenticated]);

    return(
        <Navbar bg="dark" variant="dark">
        <Nav className={`${styles.navBar} `}>

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
          
          <>
            <Button 
            variant='link'
            onClick={logout}
            >
            Log out 
            </Button> 
            <div className={styles.userInfo}>
            {name} {surname}
            </div>
          </>:
          
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
    isAuthenticated: state.isAuthenticated,
    name:state.name,
    surname:state.surname
  }
};

const mapDispatchToProps = {
  getUserInfo,
};
  
  export default connect(mapStateToProps,mapDispatchToProps)(NavMenu); 