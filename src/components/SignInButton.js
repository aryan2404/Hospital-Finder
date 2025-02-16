import { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebaseConfig";
import { Button } from "../ui/Button";

const SignInButton = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex justify-center items-center mt-6">
      {user ? (
        <Button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600">
          Sign Out
        </Button>
      ) : (
        <Button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-600">
          Sign In with Google
        </Button>
      )}
    </div>
  );
};

export default SignInButton;
