import React, { useState, useEffect } from "react";
import { auth, signInWithPopup, provider, signOut } from "../firebaseConfig";
import styles from "../styles/Navbar.module.css";
import { motion } from "framer-motion";

const Navbar = ({ isSignedIn, onAuthToggle }) => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
      onAuthToggle(!!user); 
    });
    return () => unsubscribe();
  }, [onAuthToggle]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div className={styles.logo} whileHover={{ scale: 1.1 }}>
      HospitalFinder
      </motion.div>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ""}`}>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="/">Home</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <a href="/about">About</a>
        </motion.li>
      </ul>

      <div className={styles.authSection}>
        {isSignedIn ? (
          <>
            <motion.span
              className={styles.welcomeText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Welcome, {user?.displayName?.split(" ")[0] || "User"}
            </motion.span>

            <motion.img
              src={user?.photoURL || "https://via.placeholder.com/50"}
              alt="User Avatar"
              className={styles.avatar}
              whileHover={{ scale: 1.2, rotate: 5 }}
            />

            <motion.button
              className={styles.signOutButton}
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          </>
        ) : (
          <motion.button
            className={styles.signInButton}
            onClick={handleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
