"use client";

import { Shield, Mail, Lock, Github } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import WalletConnect from "@/components/WalletConnect"; 

const Loginscreen = () => {
  
  const [loginData, setLoginData] = useState({
    email:"",
    password:""
  });

  const handleInputChange = (e) => {
      const{name, value} = e.target;
      setLoginData({
          ...loginData,
          [name]: value
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const login_endpoint =
        "https://blockchainescrow-production-ed33.up.railway.app/testcases/authentication/login/";
  
      // Send the POST request
      const response = await fetch(login_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        // Parse the response body (even for errors) to get more details
        const errorData = await response.json().catch(() => ({})); // Handle non-JSON responses gracefully
        console.error(
          `Login failed with status ${response.status}: ${response.statusText}`
        );
        console.error("Error details:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the successful response JSON
      const data = await response.json();
  
      // Console log the response data
      console.log("Login successful:", data);
  
      // Optionally, handle the token or other data here
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "/project-creation";
      }
    } catch (error) {
      // Log detailed error information
      console.error("Error during login:", error.message);
    }
  };

  const handleWalletConnected = (address) => {
    console.log("Wallet connected:", address);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold">Welcome to Zugo</h2>
          <p className="mt-2 text-gray-600">Secure payments for your projects</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            <p>Sign In</p>
            {/* <Link href="/project-creation">Sign In</Link> */}
          </button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 border py-2 px-4 rounded-lg hover:bg-gray-50">
            <Github className="h-5 w-5" />
            GitHub
          </button>
          <WalletConnect onWalletConnected={handleWalletConnected} />
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
