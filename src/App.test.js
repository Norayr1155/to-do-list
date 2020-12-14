import { render, screen } from '@testing-library/react';
import App from './App';



export default function Apptest(props){
  return(
    <div>
      <p>Hello from {props.name}</p>
    </div>
  )
}

 
