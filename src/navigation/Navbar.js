import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPhone,
  faSearch,
  faShoppingCart,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.productListData.isLoggedIn);
  const user = useSelector((state) => state.productListData.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveClass = (path) => {
    return location.pathname === path ? "text-[#FFD154]" : "text-white";
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    toast.success("Logout Success");
    navigate("/Login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

<<<<<<< HEAD
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='bg-gray-900 text-white'>
      {/* Top bar */}
      <div className='flex justify-between items-center px-6 py-2 bg-gray-200 text-black'>
        {/* Desktop Contact Info */}
        <div className='hidden md:flex items-center space-x-4'>
          <img
            src='/image/Logo.png'
            alt='RentEZ'
            className='w-[2rem] h-[2rem] mr-[62px]'
          />
          <FontAwesomeIcon icon={faPhone} className='text-sm' />
          <span className='text-sm font-text'>+12 345 6789 0</span>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className='text-sm font-text'>
            RentEzSupport@gmail.com
          </span>
        </div>

        {/* Mobile Logo */}
        <div className='md:hidden'>
          <img
            src='/image/Logo.png'
            alt='RentEZ'
            className='w-[2rem] h-[2rem]'
          />
        </div>

        {/* Account & Notifications */}
        <div className='flex items-center space-x-4 relative'>
          <div className='relative'>
            <div
              className='flex items-center cursor-pointer'
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faUser} className='text-black' />
              <span className='font-text ml-2 hidden md:inline'>
                {isLoggedIn && user ? user.fullName : "My Account"}
              </span>
            </div>
            {isMenuOpen && (
              <div className='absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40 z-50'>
                {isLoggedIn ? (
                  <>
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-sm hover:bg-gray-200'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    {user?.role.includes("ShopOwner") && (
                      <Link
                        to='/shop/dashboard'
                        className='block px-4 py-2 text-sm hover:bg-gray-200'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Manage Shop
                      </Link>
                    )}
                    {user?.role.includes("Admin") && (
                      <Link
                        to='/admin/dashboard'
                        className='block px-4 py-2 text-sm hover:bg-gray-200'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Manage Admin
                      </Link>
                    )}
                    {!user?.role.includes("Admin") &&
                      !user?.role.includes("ShopOwner") && (
                        <Link
                          to='/RegisterShop'
                          className='block px-4 py-2 text-sm hover:bg-gray-200'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Shop Registration
                        </Link>
                      )}
                    <button
                      onClick={handleLogout}
                      className='block px-4 py-2 text-sm w-full text-left hover:bg-gray-200'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to='/login'
                      className='block px-4 py-2 text-sm hover:bg-gray-200'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to='/Register'
                      className='block px-4 py-2 text-sm hover:bg-gray-200'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <FontAwesomeIcon icon={faBell} className='text-black' />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className='relative flex justify-between items-center px-4 md:px-8 py-4'>
        {/* Desktop Navigation */}
        <div className='md:flex items-center space-x-8 hidden'>
          <h1 className='text-3xl font-bold text-[#FFD700] font-logo'>
            RentEZ
          </h1>
          <Link
            to='/'
            className={`${getActiveClass("/")} hover:text-gray-400 font-text`}
          >
            Home
          </Link>
          <Link
            to='/Blog'
            className={`${getActiveClass("/Blog")} hover:text-gray-400 font-text`}
          >
            Blog
          </Link>
          <Link
            to='/ContactUs'
            className={`${getActiveClass("/ContactUs")} hover:text-gray-400 font-text`}
          >
            Contact us
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className='md:hidden text-white p-2'
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Desktop Search and Icons */}
        <div className='hidden md:flex items-center space-x-4'>
          <div className='flex'>
            <input
              type='text'
              placeholder='Siêu sale 10/10. Thuê ngay!'
              className='px-4 py-2 rounded-l-md border border-yellow-500 focus:outline-none text-black w-72'
            />
            <button className='bg-yellow-500 px-4 py-2 rounded-r-md'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <FontAwesomeIcon
            icon={faHeart}
            className='text-white text-lg cursor-pointer'
          />
          <Link to='/cart'>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className='text-white text-lg cursor-pointer'
            />
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className='md:hidden flex items-center space-x-4'>
          <FontAwesomeIcon
            icon={faSearch}
            className='text-white text-lg cursor-pointer'
          />
          <FontAwesomeIcon
            icon={faHeart}
            className='text-white text-lg cursor-pointer'
          />
          <Link to='/cart'>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className='text-white text-lg cursor-pointer'
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-gray-900`}>
        <div className='px-4 py-2'>
          <h1 className='text-2xl font-bold text-[#FFD700] font-logo mb-4'>
            RentEZ
          </h1>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Siêu sale 10/10. Thuê ngay!'
              className='w-full px-4 py-2 rounded-md border border-yellow-500 focus:outline-none text-black'
            />
          </div>
          <div className='space-y-4'>
            <Link
              to='/'
              className={`${getActiveClass("/")} block hover:text-gray-400 font-text py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to='/Blog'
              className={`${getActiveClass("/Blog")} block hover:text-gray-400 font-text py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to='/ContactUs'
              className={`${getActiveClass("/ContactUs")} block hover:text-gray-400 font-text py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </Link>
            <div className='pt-4 border-t border-gray-700'>
              <div className='flex items-center space-x-2 text-sm py-2'>
                <FontAwesomeIcon icon={faPhone} className='text-white' />
                <span>+12 345 6789 0</span>
              </div>
              <div className='flex items-center space-x-2 text-sm py-2'>
                <FontAwesomeIcon icon={faEnvelope} className='text-white' />
                <span>RentEzSupport@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
=======
	return (
		<header className='bg-gray-900 text-white'>
			<div className='flex justify-between items-center px-6 py-2 bg-gray-200 text-black'>
				<div className='flex items-center space-x-4'>
					<img
						src='/image/Logo.png'
						alt='RentEZ'
						className='w-[2rem] h-[2rem] mr-[62px]'
					/>
					<FontAwesomeIcon icon={faPhone} className='text-sm' />
					<span className='text-sm font-text'>+12 345 6789 0</span>
					<FontAwesomeIcon icon={faEnvelope} />
					<span className='text-sm font-text'>
						RentEzSupport@gmail.com
					</span>
				</div>
				<div className='flex items-center space-x-4 relative'>
					<div className='relative'>
						<div
							className='flex items-center cursor-pointer'
							onClick={toggleMenu}
						>
							<FontAwesomeIcon icon={faUser} className='text-black' />
							<span className='font-text ml-2'>
								{isLoggedIn && user ? user.fullName : "My Account"}
							</span>
						</div>
						{isMenuOpen && (
							<div className='absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40'>
								{isLoggedIn ? (
									<>
										<Link
											to='/profile?t=1'
											className='block px-4 py-2 text-sm hover:bg-gray-200'
											onClick={() => setIsMenuOpen(false)}
										>
											Thông tin cá nhân
										</Link>
										<Link
											to='/profile?t=3'
											className='block px-4 py-2 text-sm hover:bg-gray-200'
											onClick={() => setIsMenuOpen(false)}
										>
											Lịch sử đơn hàng
										</Link>
										{user?.role.includes("ShopOwner") && (
											<Link
												to='/shop/dashboard'
												className='block px-4 py-2 text-sm hover:bg-gray-200'
												onClick={() => setIsMenuOpen(false)}
											>
												Quản lý cửa hàng
											</Link>
										)}
										{user?.role.includes("Admin") && (
											<Link
												to='/admin/dashboard'
												className='block px-4 py-2 text-sm hover:bg-gray-200'
												onClick={() => setIsMenuOpen(false)}
											>
												Trang quản trị
											</Link>
										)}
										{!user?.role.includes("Admin") &&
											!user?.role.includes("ShopOwner") && (
												<Link
													to='/RegisterShop'
													className='block px-4 py-2 text-sm hover:bg-gray-200'
													onClick={() => setIsMenuOpen(false)}
												>
													Tạo cửa hàng
												</Link>
											)}
										<button
											onClick={handleLogout}
											className='block px-4 py-2 text-sm w-full text-left hover:bg-gray-200'
										>
											Đăng xuất
										</button>
									</>
								) : (
									<>
										<Link
											to='/login'
											className='block px-4 py-2 text-sm hover:bg-gray-200'
											onClick={() => setIsMenuOpen(false)}
										>
											Đăng nhập
										</Link>
										<Link
											to='/Register'
											className='block px-4 py-2 text-sm hover:bg-gray-200'
											onClick={() => setIsMenuOpen(false)}
										>
											Đăng ký
										</Link>
									</>
								)}
							</div>
						)}
					</div>
					<FontAwesomeIcon icon={faBell} className='text-black' />
				</div>
			</div>
			<nav className='flex justify-between items-center px-8 py-4'>
				<div className='flex items-center space-x-8'>
					<h1 className='text-3xl font-bold text-[#FFD700] font-logo'>
						RentEZ
					</h1>
					<Link
						to='/'
						className={`${getActiveClass("/")} hover:text-gray-400 font-text`}
					>
						Home
					</Link>
					<Link
						to='/Blog'
						className={`${getActiveClass("/Blog")} hover:text-gray-400 font-text`}
					>
						Blog
					</Link>
					<Link
						to='/ContactUs'
						className={`${getActiveClass("/ContactUs")} hover:text-gray-400 font-text`}
					>
						Contact us
					</Link>
				</div>
				<div className='flex items-center space-x-4'>
					<div className='flex'>
						<input
							type='text'
							placeholder='Siêu sale 10/10. Thuê ngay!'
							className='px-4 py-2 rounded-l-md border border-yellow-500 focus:outline-none text-black w-72'
						/>
						<button className='bg-yellow-500 px-4 py-2 rounded-r-md'>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</div>
					<FontAwesomeIcon
						icon={faHeart}
						className='text-white text-lg cursor-pointer'
					/>
					<Link to='/cart'>
						<FontAwesomeIcon
							icon={faShoppingCart}
							className='text-white text-lg cursor-pointer'
						/>
					</Link>
				</div>
			</nav>
		</header>
	);
>>>>>>> d56afd2c17a9838af9d24f496c92f794c3277b9f
};

export default Navbar;