import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Index from './index';
import Footer from './components/footer';
import {Product} from './components/Product';
import {ToDoList} from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header name="header.js"/>
        <Footer name="footer.js"/>
        <Product name='bananas ' price='12$' description='Fresh bananas from Ecuador ' /> 
        <ToDoList/>
      </header>
    </div>
  );
}

export default App;
