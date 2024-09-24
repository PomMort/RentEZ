
import './App.css';
import Home from './component/Home';
import Products from './component/Products';
import Cart from './component/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aboutus from './component/Aboutus';
import Footer from './navigation/Footer';




function App() {
  return (
    // <BrowserRouter>
    <>
      <Navbar />


      <Routes>
        <Route path='/' element={<Products />} ></Route>
        <Route path='/Home' element={<Home />} ></Route>
        <Route path='/AboutUs' element={<Aboutus />} ></Route>
        <Route path='/Cart' element={<Cart />} ></Route>
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
        <Footer/>
    </>
    // </BrowserRouter>
  );
}

export default App;
