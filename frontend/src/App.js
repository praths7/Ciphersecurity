import React from 'react';
import {
  HOME_PAGE,
  CAESAR_CIPHER,
  MONOALPHABETIC_CIPHER,
  HOMOPHONIC_CIPHER
} from './constants/routeConstants';
import { HomePage } from './pages/home/home';
import { CaesarCipherPage } from './pages/caesar/caesar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MonoalphabeticCipherPage } from "./pages/monoalphabetic/monoalphabetic";
import {HomophonicCipherPage} from "./pages/homophonic/homophonic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE} element={<HomePage/>}/>
        <Route path={CAESAR_CIPHER} element={<CaesarCipherPage/>}/>
        <Route path={MONOALPHABETIC_CIPHER} element={<MonoalphabeticCipherPage/>}/>
        <Route path={HOMOPHONIC_CIPHER} element={<HomophonicCipherPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
