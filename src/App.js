import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./AdminRoute/AdminRoute";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import AddBlog from "./Pages/Dashboard/AddBlog/AddBlog";
import AllBlogs from "./Pages/Dashboard/AllBlogs/AllBlogs";
import AllReviews from "./Pages/Dashboard/AllReviews/AllReviews";
import AllUsers from "./Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyReviews from "./Pages/Dashboard/MyReviews/MyReviews";
import PageRols from "./Pages/Dashboard/PageRols/PageRols";
import Slider from "./Pages/Dashboard/Slider/Slider";
import HomePage from "./Pages/Homepage/HomePage";
import Login from "./Pages/Login/Login";
import ResetPass from "./Pages/ResetPass/ResetPass";
import SignUp from "./Pages/SignUp/SignUp";
import SingleBlog from "./Pages/SingleBlog/SingleBlog";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/blog/:id' element={<SingleBlog />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/login' element={<Login />} />
						<Route path='/resetpass' element={<ResetPass />} />
						<Route
							path='/dashboard'
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}>
							<Route path='/dashboard' element={<MyReviews />} />
							<Route path='/dashboard/addblog' element={<AddBlog />} />
							<Route
								path='/dashboard/allblogs'
								element={
									<AdminRoute>
										<AllBlogs />
									</AdminRoute>
								}
							/>
							<Route
								path='/dashboard/slider'
								element={
									<AdminRoute>
										<Slider />
									</AdminRoute>
								}
							/>
							<Route
								path='/dashboard/allreviews'
								element={
									<AdminRoute>
										<AllReviews />
									</AdminRoute>
								}
							/>
							<Route
								path='/dashboard/userRoles'
								element={
									<AdminRoute>
										<PageRols />
									</AdminRoute>
								}
							/>

							<Route
								path='/dashboard/allusers'
								element={
									<AdminRoute>
										<AllUsers />
									</AdminRoute>
								}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
