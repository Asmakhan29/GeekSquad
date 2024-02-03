import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TermsOfUse from './components/TermsOfUse';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ListTutor from './components/ListTutor';
import NewNavbar from './components/NewNavbar';
import TutorProfile from './components/TutorProfile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <NewNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/TermsOfUse' element={<TermsOfUse />} />
          <Route path='/tutor/:category' element={<ListTutor />} />
          <Route path='/tutorprofile' element={<TutorProfile />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
