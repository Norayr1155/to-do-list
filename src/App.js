import logo from './logo.svg';
import './App.css';
import Apptest from './App.test';
import Index from './index';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Apptest name="App.test.js-version1"/>
        <Apptest name="App.test.js-version2"/>
        <Index name="Index.js-version1"/>
        <Index name="Index.js-version1"/>

      </header>
    </div>
  );
}

export default App;
