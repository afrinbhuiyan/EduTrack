import { useEffect, useState, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error("Error creating user:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error("Error signing in:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .catch((error) => {
        console.error("Error with Google login:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .catch((error) => {
        console.error("Error resetting password:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .catch((error) => {
        console.error("Error logging out:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const updateUserProfile = (profile) => {
  setLoading(true);
  return updateProfile(auth.currentUser, profile)
    .then(() => {
      setUser({ ...auth.currentUser });
      return true;
    })
    .catch((error) => {
      console.error("Error updating profile:", error.message);
      throw error;
    })
    .finally(() => setLoading(false));
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      createUser,
      signInUser,
      googleLogin,
      logout,
      updateUserProfile,
      resetPassword,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;