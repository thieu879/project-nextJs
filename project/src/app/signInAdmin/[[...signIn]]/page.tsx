import { SignIn } from "@clerk/nextjs";
import React from "react";

const customAppearance = {
  elements: {
    card: "bg-white shadow-xl rounded-t-2xl rounded-b-none p-8 max-w-md mx-auto border border-gray-200",
    formFieldInput:
      "border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none",
    formButtonPrimary:
      "bg-green-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105",
    headerTitle: "text-4xl font-extrabold text-gray-900 mb-4",
    headerSubtitle: "text-md text-gray-600 mb-6",
    footerActionLink: "text-green-500 hover:text-green-600 underline",
  },
  variables: {
    colorPrimary: "#32CD32",
    colorBackground: "#F9FAFB",
    colorText: "#2D3748",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "12px",
  },
};

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <SignIn appearance={customAppearance} />
    </div>
  );
};

export default Page;
