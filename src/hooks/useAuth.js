import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo;
};

export default useAuth;