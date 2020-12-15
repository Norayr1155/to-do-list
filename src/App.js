import logo from './logo.svg';
import './App.css';
import Header from './header';
import Index from './index';
import Footer from './footer';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header name="header.js"/>
        <Footer name="footer.js"/>
      </header>
    </div>
  );
}

export default App;
