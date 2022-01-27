import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import AddBlog from "./Pages/Dashboard/AddBlog/AddBlog";
import AllBlogs from "./Pages/Dashboard/AllBlogs/AllBlogs";
import AllReviews from "./Pages/Dashboard/AllReviews/AllReviews";
import AllUsers from "./Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PageRols from "./Pages/Dashboard/PageRols/PageRols";
import HomePage from "./Pages/Homepage/HomePage";
import Login from "./Pages/Login/Login";
import ResetPass from "./Pages/ResetPass/ResetPass";
import SignUp from "./Pages/SignUp/SignUp";
import SingleBlog from "./Pages/SingleBlog/SingleBlog";

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
						<Route path='/dashboard' element={<Dashboard />}>
							<Route path='/dashboard' element={<AddBlog />} />
							<Route path='/dashboard/allblogs' element={<AllBlogs />} />
							<Route path='/dashboard/allreviews' element={<AllReviews />} />
							<Route path='/dashboard/userRoles' element={<PageRols />} />
							<Route path='/dashboard/allusers' element={<AllUsers />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
