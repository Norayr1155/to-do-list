import React ,{useEffect}from 'react'; 
import './App.css';
import ToDoList from './components/Pages/ToDoList/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router,Route,Switch,Redirect} from 'react-router-dom';
import About from './components/Pages/About/About';
import Contact from './components/Pages/Contact/Contact';
import Error404 from './components/Pages/Error404/Error404';
import NavMenu from './components/NavMenu/NavMenu ';
import SingleTask from './components/Pages/SingleTask/SingleTask';
import Registration from './components/Pages/Registration/Registration';
import Login from './components/Pages/Login/Login';
import Spinner from './components/Spinner/Spinner';
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

function AuthRoute({path, component}){

  return (
    <Route 
    path={path}
    component={component}
   />
  );

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
          />
          
          <AuthRoute
          path='/home'
          component={ToDoList}
          exact
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
          />
          <AuthRoute
          path='/registration'
          component={Registration}
          exact
          />
          <AuthRoute
          path='/login'
          component={Login}
          exact
          />
          <Redirect to='/error404'/>
          </Switch>
      </Router>
      { loading && <Spinner />}
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage,
      isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps,null)(App);