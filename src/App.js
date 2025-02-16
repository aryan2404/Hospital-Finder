import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import AboutSection from "./components/About";
import { auth } from "./firebaseConfig"; 

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar isSignedIn={isSignedIn} onAuthToggle={setIsSignedIn} />
      <div className="main-container">
        {isSignedIn ? (
          <>
            <Map />
          </>
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            {/* Sign In */}
          </h2>
        )}
        <AboutSection />
      </div>
    </div>
  );
};

export default App;
