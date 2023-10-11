import React from 'react';
import { HomePage } from './pages/home/home';
import { CaesarCipherPage } from './pages/caesar/caesar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME_PAGE, CAESAR_CIPHER } from './constants/routeConstants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE} element={<HomePage/>}/>
        <Route path={CAESAR_CIPHER} element={<CaesarCipherPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
