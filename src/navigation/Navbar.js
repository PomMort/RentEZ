import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.productListData.isLoggedIn);
  const user = useSelector(state => state.productListData.user);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getActiveClass = (path) => {
    return location.pathname === path ? 'text-[#FFD154]' : 'text-white';
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsMenuOpen(false);
    localStorage.removeItem('Auth');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-gray-900 text-white'>
      <div className='flex justify-between items-center px-6 py-2 bg-gray-200 text-black'>
        <div className='flex items-center space-x-4'>
          <img src='/image/Logo.png' alt='RentEZ' className='w-[2rem] h-[2rem] mr-[62px]' />
          <FontAwesomeIcon icon={faPhone} className='text-sm' />
          <span className='text-sm font-text'>+12 345 6789 0</span>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className='text-sm font-text'>RentEzSupport@gmail.com</span>
        </div>
        <div className='flex items-center space-x-4 relative'>
          <div className="relative">
            <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUser} className="text-black" />
              <span className='font-text ml-2'>
                {isLoggedIn && user ? user.fullName : 'My Account'}
              </span>
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40">
                {isLoggedIn ? (
                  <>
                    <Link to="/myProfile" className="block px-4 py-2 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
          <FontAwesomeIcon icon={faBell} className="text-black" />
        </div>
      </div>
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-[#FFD700] font-logo">RentEZ</h1>
          <Link to="/" className={`${getActiveClass('/')} hover:text-gray-400 font-text`}>Home</Link>
          <Link to="/Blog" className={`${getActiveClass('/Blog')} hover:text-gray-400 font-text`}>Blog</Link>
          <Link to="/ContactUs" className={`${getActiveClass('/ContactUs')} hover:text-gray-400 font-text`}>Contact us</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Siêu sale 10/10. Thuê ngay!"
              className="px-4 py-2 rounded-l-md border border-yellow-500 focus:outline-none text-black w-72"
            />
            <button className="bg-yellow-500 px-4 py-2 rounded-r-md">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <FontAwesomeIcon icon={faHeart} className="text-white text-lg cursor-pointer" />
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white text-lg cursor-pointer" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;