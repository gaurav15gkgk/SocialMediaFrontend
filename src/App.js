import React from 'react'
import { BrowserRouter } from "react-router-dom"
import MainRouter from "./MainRouter"
require('dotenv').config()

const App = () => (
  <BrowserRouter>
      <MainRouter />
  </BrowserRouter>
);

export default App;
