import React, { createContext } from 'react';
import useFirebase from '../Firebase/useFirebase';

export const AuthContex = createContext()
const AuthProvider = ({ children }) => {
    return (
        <AuthContex.Provider value={useFirebase()}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;