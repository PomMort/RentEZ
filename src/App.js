
import './App.css';
import Cart from './component/Cart';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './navigation/Footer';
import Home from './component/Home';
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import MainLayout from './layout/MainLayout';
import AboutUs from './component/AboutUs';
import Blog from './component/Blog';
import Contactus from './component/Contactus';




function App() {
  return (

    <>

      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} ></Route>
        <Route path='/Blog' element={<MainLayout><Blog /></MainLayout>} ></Route>
        <Route path='/Cart' element={<MainLayout><Cart /></MainLayout>} ></Route>
        <Route path='/AboutUs' element={<MainLayout><AboutUs /></MainLayout>} ></Route>
        <Route path='/ContactUs' element={<MainLayout><Contactus /></MainLayout>} ></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/Register' element={<RegisterPage />}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </>

  );
}

export default App;
