import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useState } from "react";

const Register = () => {

  const {register,isLoading}= useAuthStore();
  const [formData, setFormData] = useState(null);
   const handleChange = async(e)=>{
    setFormData({
      ...formData,[e.target.id]:[e.target.value],
    });
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    register(formData)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role (optional UI) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Role (optional)
            </label>
            <select
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to={'/login'} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;