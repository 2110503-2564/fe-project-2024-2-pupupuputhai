"use client";

import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      {isSignUp ? <SignUp /> : <SignIn />}
      <p className="text-center text-sm text-gray-600 mt-4">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}
