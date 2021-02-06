import React from 'react'; 
import './App.css';
import {ToDoList} from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import About from './components/Pages/About/About';
import Contact from './components/Pages/Contact/Contact';
import Error404 from './components/Pages/Error404/Error404';
import NavMenu from './components/NavMenu/NavMenu ';
import SingleTask from './components/Pages/SingleTask/SingleTask';



function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <NavMenu/>
        <Switch>
          <Route
          path='/'
          component={ToDoList}
          exact
          />
          <Route
          path='/home'
          component={ToDoList}
          exact
          />
          <Route
          path='/about'
          component={About}
          exact
          />
          <Route
          path='/contact'
          component={Contact}
          exact
          />
          <Route
          path='/error404'
          component={Error404}
          exact
          />
          <Route
          path='/task/:taskId'
          component={SingleTask}
          exact
          />
          <Redirect to='/error404'/>
          </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
