import { faBell, faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faH, faPhone, faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () =>{
  const location = useLocation();

  const getActiveClass = (path) =>{
    return location.pathname === (path) ? 'text-[#FFD154]' : 'text-white';
  };
  return(
    <header className='bg-gray-900 text-white'>
      <div className='flex justify-between items-center px-6 py-2 bg-gray-200 text-black'>
        <div className='flex items-center space-x-4'>
          <FontAwesomeIcon icon={faPhone} className='text-sm'/>
          <span className='text-sm'>+12 345 6789 0</span>
          <FontAwesomeIcon icon={faEnvelope}/>
          <span className='text-sm'>RentEzSupport@gmail.com</span>
        </div>
        <div className='flex items-center space-x-4'>
        <FontAwesomeIcon icon={faUser} className="text-black" />
          <span>My account</span>
          <FontAwesomeIcon icon={faBell} className="text-black" />
        </div>
      </div>
      <nav className="flex justify-between items-center px-8 py-4">
        {/* Logo và Menu */}
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-[#FFD700] font-logo">RentEZ</h1>
          <Link to="/" className={`${getActiveClass('/')} hover:text-gray-400`}>Home</Link>
          <Link to="/AboutUs" className={`${getActiveClass('/AboutUs')} hover:text-gray-400`}>About us</Link>
          <Link to="/Blog" className={`${getActiveClass('/Blog')} hover:text-gray-400`}>Blog</Link>
          <Link to="/ContactUs" className={`${getActiveClass('/ContactUs')} hover:text-gray-400`}>Contact us</Link>
        </div>
        {/* Search Box và Icons */}
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
          <FontAwesomeIcon icon={faShoppingCart} className="text-white text-lg cursor-pointer" />
        </div>
      </nav>
    </header>
  )
}
export default Navbar