import React ,{useEffect}from 'react'; 
import './App.css';
import ToDoList from './components/Pages/ToDoList/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router,Switch,Redirect} from 'react-router-dom';
import About from './components/Pages/About/About';
import Contact from './components/Pages/Contact/Contact';
import Error404 from './components/Pages/Error404/Error404';
import NavMenu from './components/NavMenu/NavMenu ';
import SingleTask from './components/Pages/SingleTask/SingleTask';
import Registration from './components/Pages/Registration/Registration';
import Login from './components/Pages/Login/Login';
import Spinner from './components/Spinner/Spinner';
import AuthRoute from './components/AuthRoute';
import Footer from './components/Footer/Footer';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history';

const notification ={
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};


function App({loading, successMessage, errorMessage}) {

  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage, notification);
    }

    if(errorMessage){
      toast.error(errorMessage, notification);
    }

  }, [successMessage, errorMessage]);

  return (
    <div className="App">
      
      <Router history={history}>
      <NavMenu/>
        <Switch>
          <AuthRoute 
          path='/'
          component = {ToDoList}
          exact
          type='private'
          />
          
          <AuthRoute
          path='/home'
          component={ToDoList}
          exact
          type='private'
          />
          <AuthRoute
          path='/about'
          component={About}
          exact
          />
          <AuthRoute
          path='/contact'
          component={Contact}
          exact
          />
          <AuthRoute
          path='/error404'
          component={Error404}
          exact
          />
          <AuthRoute
          path='/task/:taskId'
          component={SingleTask}
          exact
          type='private'
          />
          <AuthRoute
          path='/registration'
          component={Registration}
          exact
          type='public'
          />
          <AuthRoute
          path='/login'
          component={Login}
          exact
          type='public'
          />
          <Redirect to='/error404'/>
          </Switch>
      </Router>
      { loading && <Spinner />}
      <ToastContainer />
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage,
  };
};

export default connect(mapStateToProps,null)(App);