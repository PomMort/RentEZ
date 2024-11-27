import "./App.css";
import Cart from "./component/Cart";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./component/Home";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./login/RegisterPage";
import MainLayout from "./layout/MainLayout";
import Blog from "./component/Blog";
import Contactus from "./component/Contactus";
import ProductDetail from "./component/Product/ProductsDetail";
import Order from "./component/Order/Order";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import OrderHandler from "./component/Order/OrderHandler";
import ActiveAccountPage from "./login/ActiveAccountPage";
import UserProfile from "./component/Profile/UserProfile";
import ManageLayout from "./layout/ManageLayout";
import NavbarAdmin from "./Admin/NavbarAdmin";
import Dashboard from "./Admin/Dashboard/Dashboard";
import ManageUsers from "./Admin/Users/ManageUsers";
import ManageCategories from "./Admin/Categories/ManageCategories";
import ManageVouchers from "./Admin/Vouchers/ManageVouchers";
import ManageShops from "./Admin/Shops/ManageShops";
import ManageProducts from "./Shopkeeper/Products/ManageProducts";
import ManageOrders from "./Shopkeeper/Orders/ManageOrders";
import ManageVouchersShop from "./Shopkeeper/Vouchers/ManageVouchers";
import DashboardShop from "./Shopkeeper/Dashboard/Dashboard";
import NavbarShop from "./Shopkeeper/NavbarShop";
import RegisterShopper from "./login/RegisterShopper";
import ManageOrdersAdmin from "./Admin/Order/ManageOrder";
// import RouteForLogin from "./layout/RouteForLogin";
import ResetPassword from "./login/ResetPassword";
import ManageFeedbacks from "./Shopkeeper/Feedbacks/ManageFeedbacks";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "LOAD_USER" });
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<MainLayout>
							<Home />
						</MainLayout>
					}
				/>
				<Route
					path='/Blog'
					element={
						<MainLayout>
							<Blog />
						</MainLayout>
					}
				/>
				<Route
					path='/Cart'
					element={
						<MainLayout>
							<Cart />
						</MainLayout>
					}
				/>
				<Route
					path='/ContactUs'
					element={
						<MainLayout>
							<Contactus />
						</MainLayout>
					}
				/>
				<Route
					path='/profile'
					element={
						// <RouteForLogin>
						<MainLayout>
							<UserProfile />
						</MainLayout>
						// </RouteForLogin>
					}
				/>
				<Route
					path='/order'
					element={
						// <RouteForLogin>
						<MainLayout>
							<Order />
						</MainLayout>
						// </RouteForLogin>
					}
				/>
				<Route
					path='/order-handler'
					element={
						<MainLayout>
							<OrderHandler />
						</MainLayout>
					}
				/>
				<Route path='/Login' element={<LoginPage />} />
				<Route path='/Register' element={<RegisterPage />} />
				<Route path='/RegisterShop' element={<RegisterShopper />} />
				<Route
					path='/active-account/:email/:username'
					element={<ActiveAccountPage />}
				/>
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route
					path='/Detail/:id'
					element={
						<MainLayout>
							<ProductDetail />
						</MainLayout>
					}
				/>

				{/*=================== ADMIN ===================*/}
				<Route
					path='/admin/dashboard'
					element={
						<ManageLayout isAdmin={true} navbar={<NavbarAdmin />}>
							<Dashboard />
						</ManageLayout>
					}
				/>
				<Route
					path='/admin/manage-users'
					element={
						<ManageLayout isAdmin={true} navbar={<NavbarAdmin />}>
							<ManageUsers />
						</ManageLayout>
					}
				/>
				<Route
					path='/admin/manage-categories'
					element={
						<ManageLayout isAdmin={true} navbar={<NavbarAdmin />}>
							<ManageCategories />
						</ManageLayout>
					}
				/>
				<Route
					path='/admin/manage-vouchers'
					element={
						<ManageLayout isAdmin={true} navbar={<NavbarAdmin />}>
							<ManageVouchers />
						</ManageLayout>
					}
				/>
				<Route
					path='/admin/manage-shops'
					element={
						<ManageLayout isAdmin={true} navbar={<NavbarAdmin />}>
							<ManageShops />
						</ManageLayout>
					}
				/>
				<Route
					path='/admin/manage-orders'
					element={
						<ManageLayout isAdmin={true} navbar={<NavbarAdmin />}>
							<ManageOrdersAdmin />
						</ManageLayout>
					}
				/>

				{/*=================== SHOP OWNER ===================*/}
				<Route
					path='/shop/dashboard'
					element={
						<ManageLayout isAdmin={false} navbar={<NavbarShop />}>
							<DashboardShop />
						</ManageLayout>
					}
				/>
				<Route
					path='/shop/manage-products'
					element={
						<ManageLayout isAdmin={false} navbar={<NavbarShop />}>
							<ManageProducts />
						</ManageLayout>
					}
				/>
				<Route
					path='/shop/manage-orders'
					element={
						<ManageLayout isAdmin={false} navbar={<NavbarShop />}>
							<ManageOrders />
						</ManageLayout>
					}
				/>
				<Route
					path='/shop/manage-vouchers'
					element={
						<ManageLayout isAdmin={false} navbar={<NavbarShop />}>
							<ManageVouchersShop />
						</ManageLayout>
					}
				/>
				<Route
					path='/shop/manage-feedbacks'
					element={
						<ManageLayout isAdmin={false} navbar={<NavbarShop />}>
							<ManageFeedbacks />
						</ManageLayout>
					}
				/>
			</Routes>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
}

export default App;
