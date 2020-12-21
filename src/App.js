import logo from './logo.svg';
import './App.css';
import Header from './header';
import Index from './index';
import Footer from './footer';
import {Product} from './Product';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header name="header.js"/>
        <Footer name="footer.js"/>
        <Product name='bananas ' price='12$' description='Fresh bananas from Ecuador ' /> 
      </header>
    </div>
  );
}

export default App;
