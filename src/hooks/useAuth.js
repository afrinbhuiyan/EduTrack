import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    if (!authInfo) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return authInfo;
};

export default useAuth;