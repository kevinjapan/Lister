import React from 'react'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import Home from './components/Home/Home'

/*
http://localhost/api/listerapi/listerapi
*/
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Home api=""/>
      </BrowserRouter>
    </div>
  )
}

export default App
