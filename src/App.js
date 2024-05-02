import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import { FaBars } from 'react-icons/fa'; // Importe o ícone FaBars para representar a abertura do sidebar

function App() {


  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Renderize a Home passando toggleSidebar como prop */}
              <Home/>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
