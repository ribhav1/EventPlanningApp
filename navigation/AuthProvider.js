import React, { createContext, useState } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, name, age, contactNumber) => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase.firestore().collection('users').doc(email).set({
              name: name,
              age: age,
              email: email,
              contactNumber: contactNumber,
            })
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};