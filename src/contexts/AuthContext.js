import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
  const [ currentUser, setCurrentUser ] = useState();
  
  const value = {
    currentUser,
    signup
  };

  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }


  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}
