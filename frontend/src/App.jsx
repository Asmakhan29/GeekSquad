import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TermsOfUse from './components/TermsOfUse';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ListTutor from './components/ListTutor';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/TermsOfUse' element={<TermsOfUse />} />
          <Route path='/tutor/:category' element={<ListTutor />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
