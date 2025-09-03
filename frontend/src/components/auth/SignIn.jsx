import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
      path="/auth/sign-in" 
        routing="path"
        signUpUrl="/auth/sign-up"
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl border border-gray-200",
            formButtonPrimary:
              "bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200",
            formFieldInput:
              "border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-lg",
            formFieldLabel: "text-gray-700 font-medium",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
