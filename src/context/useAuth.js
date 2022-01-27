import { useContext } from "react";
import { AuthContex } from "./AuthProvider";

const useAuth = () => {
    return useContext(AuthContex)
};

export default useAuth;