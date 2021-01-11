import './App.css';
import {ToDoList} from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
         <ToDoList/>
      </header>
    </div>
  );
}

export default App;
