import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Counter from './components/Counter/Counter';
import { Provider } from 'react-redux';
import {createStore} from 'redux';


function reducer(state={ count: 0}, action){
  
  if(action.type === 'INCREMENT_COUNT'){
    return {
      ...state,
      count: state.count+1
    };
  }
  
  if(action.type === 'DECREMENT_COUNT'){
    return {
      ...state,
      count: state.count-1
    };
  }
  
  return state;

};
  
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Counter />
    </Provider>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


