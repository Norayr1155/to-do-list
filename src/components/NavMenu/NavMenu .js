import React ,{useEffect} from 'react';
import {Navbar, Nav,Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './navMenuStyle.module.css';
import {connect} from 'react-redux';
import {logout} from '../../helpers/auth';
import {getUserInfo} from '../store/actions';


function NavMenu({ isAuthenticated ,getUserInfo,userInfo}){


  useEffect(()=>{
    if(isAuthenticated){
      getUserInfo()
    }
  },[getUserInfo,isAuthenticated]);
  

    return(
      <>
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
         >
         Contact us
         </NavLink>
         

        {
          isAuthenticated?
          
          <div className={styles.logout}>
            <Button 
            variant='link'
            onClick={logout}
            >
            Log out 
            </Button> 
          </div>
          :
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

      {
        isAuthenticated && userInfo?
        <div className={styles.userInformation}>
          {userInfo.name} {userInfo.surname} 
        </div>:
        null
      }
      </>
    );

}; 



const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.isAuthenticated,
    userInfo:state.userInfo
    
  }
};

const mapDispatchToProps = {
  getUserInfo,
};
  
  export default connect(mapStateToProps,mapDispatchToProps)(NavMenu); 