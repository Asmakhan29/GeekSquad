import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import TermsOfUse from './components/TermsOfUse'
import { BrowserRouter,Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Home/>

          <Routes>
            <Route path='/TermsOfUse' element={ <TermsOfUse /> } />
          </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
