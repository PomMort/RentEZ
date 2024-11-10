import "./App.css";
import Cart from "./component/Cart";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./component/Home";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./login/RegisterPage";
import MainLayout from "./layout/MainLayout";
import AboutUs from "./component/AboutUs";
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
				></Route>
				<Route
					path='/Blog'
					element={
						<MainLayout>
							<Blog />
						</MainLayout>
					}
				></Route>
				<Route
					path='/Cart'
					element={
						<MainLayout>
							<Cart />
						</MainLayout>
					}
				></Route>
				<Route
					path='/ContactUs'
					element={
						<MainLayout>
							<Contactus />
						</MainLayout>
					}
				></Route>
				<Route
					path='/profile'
					element={
						<MainLayout>
							<UserProfile />
						</MainLayout>
					}
				></Route>
				<Route
					path='/order'
					element={
						<MainLayout>
							<Order />
						</MainLayout>
					}
				></Route>
				<Route
					path='/order-handler'
					element={
						<MainLayout>
							<OrderHandler />
						</MainLayout>
					}
				></Route>
				<Route path='/Login' element={<LoginPage />}></Route>
				<Route path='/Register' element={<RegisterPage />}></Route>
				<Route
					path='/active-account/:email/:username'
					element={<ActiveAccountPage />}
				></Route>
				<Route
					path='/Detail/:id'
					element={
						<MainLayout>
							<ProductDetail />
						</MainLayout>
					}
				></Route>

				{/* ADMIN */}
				<Route
					path='/admin/dashboard'
					element={
						<ManageLayout navbar={<NavbarAdmin />}>
							<Dashboard />
						</ManageLayout>
					}
				></Route>
				<Route
					path='/admin/manage-users'
					element={
						<ManageLayout navbar={<NavbarAdmin />}>
							<ManageUsers />
						</ManageLayout>
					}
				></Route>
				<Route
					path='/admin/manage-categories'
					element={
						<ManageLayout navbar={<NavbarAdmin />}>
							<ManageCategories />
						</ManageLayout>
					}
				></Route>
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
