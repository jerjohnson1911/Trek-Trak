import React from 'react'
import './reset.css';
import Nav from './Components/Nav/Nav'
import './Components/Nav/Nav.css'
import routes from './routes'
import styled from '@emotion/styled'

const Body = styled.div`
background-color: #283618;
`

function App() {
  return (
    <Body className="App">
      <Nav />
      {/* <h1>TREK TRAK tada!!!</h1> */}
     {routes}
    </Body>
  );
}

export default App;
