import { Annoyed } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'test@gmail.com' && password === "test"){
        alert("Login successful!");
        navigate("/home");
    }
    else{
        alert("Login credentials are wrong,Please try again.");
    }
    // Define the API URL
    // const apiUrl = `https://sahils2004.app.n8n.cloud/webhook-test/login`;

    // // Make the request
    // fetch(`${apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Login response:", data);
    //     if (data.success) {
    //       alert(data.message || "Login successful!");
    //       navigate("/home"); // Redirect to the "home" page after successful login
    //     } else {
    //       alert(data.message || "Login failed. Please check your credentials.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error during login:", error);
        
    //   });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
