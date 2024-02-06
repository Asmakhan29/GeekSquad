
import './App.css';
import TermsOfUse from './components/TermsOfUse';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListTutor from './components/ListTutor';
import TutorProfile from './components/TutorProfile';
import UserProvider from './Context/UserContext';
import { MainNavbar } from './components/MainNavbar';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import Home from './components/Home';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <BrowserRouter>
          <UserProvider>
            <MainNavbar />
            {/* <Navbar /> */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/TermsOfUse' element={<TermsOfUse />} />
              <Route path='/tutor/:category' element={<ListTutor />} />
              <Route path='/tutorprofile' element={<TutorProfile />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
