import React from 'react';
import {
  HOME_PAGE,
  CAESAR_CIPHER,
  MONOALPHABETIC_CIPHER,
  HOMOPHONIC_CIPHER,
  VIGENERE_CIPHER
} from './constants/routeConstants';
import { HomePage } from './pages/home/home';
import { CaesarCipherPage } from './pages/caesar/caesar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MonoalphabeticCipherPage } from "./pages/monoalphabetic/monoalphabetic";
import { HomophonicCipherPage } from "./pages/homophonic/homophonic";
import { VigenereCipherPage } from "./pages/vigenere/vigenere";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE} element={<HomePage/>}/>
        <Route path={CAESAR_CIPHER} element={<CaesarCipherPage/>}/>
        <Route path={MONOALPHABETIC_CIPHER} element={<MonoalphabeticCipherPage/>}/>
        <Route path={HOMOPHONIC_CIPHER} element={<HomophonicCipherPage/>}/>
        <Route path={VIGENERE_CIPHER} element={<VigenereCipherPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
