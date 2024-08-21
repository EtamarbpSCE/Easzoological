import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const withAuth = (Component, allowedRoles, setUserState) => {
  return (props) => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const { role } = decodedToken;
      if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
      }

      return <Component {...props} role={role} />;
    } catch (error) {
      console.error('Invalid token', error);
      return <Navigate to="/login" />;
    }
  };
};

export default withAuth;
