import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import HomePg from './pages/HomePg';
import LoginPg from './pages/LoginPg';
import RegisterPg from './pages/RegisterPg';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePg />} />
        <Route path='/login' element={<SignInForm />} />
        <Route path='/register' element={<SignUpForm />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
