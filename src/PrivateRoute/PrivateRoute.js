import React from "react";

import HashLoader from "react-spinners/HashLoader";
import useAuth from "../context/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
	let { user, isLoading } = useAuth();
	let location = useLocation();
	if (isLoading) {
		return (
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}>
				<HashLoader size={100} color={"#35D5B6"} />
			</div>
		);
	}
	if (user?.email) {
		return children;
	}
	return <Navigate to='/login' state={{ from: location }} />;
};
export default PrivateRoute;
