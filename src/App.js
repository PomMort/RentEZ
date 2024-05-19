
import './App.css';
import Home from './component/Home';
import Products from './component/Products';
import Reviews from './component/Reviews';
import Cart from './component/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function App() {
  return (
    // <BrowserRouter>
    <>
      <Navbar />


      <Routes>
        <Route path='/' element={<Products />} ></Route>
        <Route path='/Home' element={<Home />} ></Route>
        <Route path='/Reviews' element={<Reviews />} ></Route>
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

    </>
    // </BrowserRouter>
  );
}

export default App;
