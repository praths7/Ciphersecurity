import React from 'react';
import {
  HOME_PAGE,
  CAESAR_CIPHER,
  MONOALPHABETIC_CIPHER,
  HOMOPHONIC_CIPHER,
  VIGENERE_CIPHER,
  HILL_CIPHER,
  PRATZ_CIPHER,
  RGRID_CIPHER
} from './constants/routeConstants';
import { HomePage } from './pages/home/home';
import { CaesarCipherPage } from './pages/caesar/caesar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MonoalphabeticCipherPage } from "./pages/monoalphabetic/monoalphabetic";
import { HomophonicCipherPage } from "./pages/homophonic/homophonic";
import { VigenereCipherPage } from "./pages/vigenere/vigenere";
import { HillCipherPage } from "./pages/hill/hill";
import { RgridCipherPage } from "./pages/rgrid/rgrid";
import { PratzCipherPage } from "./pages/pratz/pratz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE} element={<HomePage/>}/>
        <Route path={CAESAR_CIPHER} element={<CaesarCipherPage/>}/>
        <Route path={MONOALPHABETIC_CIPHER} element={<MonoalphabeticCipherPage/>}/>
        <Route path={HOMOPHONIC_CIPHER} element={<HomophonicCipherPage/>}/>
        <Route path={VIGENERE_CIPHER} element={<VigenereCipherPage/>}/>
        <Route path={HILL_CIPHER} element={<HillCipherPage/>}/>
        <Route path={RGRID_CIPHER} element={<RgridCipherPage/>}/>
        <Route path={PRATZ_CIPHER} element={<PratzCipherPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
