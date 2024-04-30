
import './App.css';
import TermsOfUse from './components/TermsOfUse';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ListTutor from './components/ListTutor';
import TutorProfile from './components/TutorProfile';
import { UserProvider } from './Context/UserContext';
import { MainNavbar } from './components/MainNavbar';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import Home from './components/Home';
import { SnackbarProvider } from 'notistack';
import BrowseTutor from './components/BrowseTutor';
import TutorDetails from './components/TutorDetails';
import { TutorProvider } from './Context/TutorContext';
import UserProfile from './components/UserProfile';
import UserAuthoriser from './auth/userAuth';
import TutorAuthoriser from './auth/tutorAuth';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';
import Feedback from './components/Feedback';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import PaymentHistory from './components/PaymentHistory';
import ResetPassword from './components/reset-password';
import Contact from './components/Contact';
import ChatPage from './components/ChatPage';

TimeAgo.addDefaultLocale(en)

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <BrowserRouter>

            <TutorProvider>
              <UserProvider>
                <MainNavbar />
                {/* <Navbar /> */}
                <Routes>
                  <Route path='/' element={<Navigate to="/home" />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/reset-password' element={<ResetPassword />} />
                  <Route path='/TermsOfUse' element={<TermsOfUse />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/tutor/:category' element={<ListTutor />} />
                  <Route path='/browse/:subject' element={<BrowseTutor />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='/browse' element={<BrowseTutor />} />
                  <Route path='/details/:id' element={<UserAuthoriser> <TutorDetails /> </UserAuthoriser> } />
                  <Route path='/tutorprofile' element={<TutorAuthoriser> <TutorProfile /> </TutorAuthoriser>} />
                  <Route path='/userprofile' element={<UserAuthoriser> <UserProfile /> </UserAuthoriser>} />
                  <Route path='/checkout/:tutorid' element={
                    <UserAuthoriser>
                      <Checkout />
                    </UserAuthoriser>} />
                  <Route path='/tutordetails' element={<TutorDetails />} />
                  <Route path='/thankyou/:tutorid' element={<UserAuthoriser> <ThankYou /> </UserAuthoriser>} />
                  <Route path='/payment-history' element={<UserAuthoriser><PaymentHistory /> </UserAuthoriser>} />
                  <Route path='/feedback' element={<UserAuthoriser> <Feedback /> </UserAuthoriser>} />
                </Routes>
              </UserProvider>
            </TutorProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </MantineProvider>
    </>
  )
}

export default App
