import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Apptest from './App.test';



export default function Index(props){
  return(
    <div>
      <p>Hello from {props.name}</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


