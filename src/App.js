import React from 'react'
import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes'


function App() {
  return (
    <div className="App">
      <Nav />
      {/* <h1>TREK TRAK tada!!!</h1> */}
     {routes}
    </div>
  );
}

export default App;
