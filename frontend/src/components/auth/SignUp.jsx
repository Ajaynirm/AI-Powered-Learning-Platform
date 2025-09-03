import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <SignUp
        path="/auth/sign-up"        
        routing="path"
        signInUrl="/auth/sign-in"
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl border border-gray-200",
            formButtonPrimary:
              "bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200",
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
