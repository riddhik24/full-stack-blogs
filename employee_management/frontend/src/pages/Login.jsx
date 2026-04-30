import { Link } from 'react-router-dom';
import {useAuthStore} from '../store/auth.store'
import { useState } from "react";
const Login = () => {

  const {login,isLoading} = useAuthStore();
  const [formData,setFormData] = useState(null);

  const handleChange = async(e)=>{
    setFormData({
      ...formData,[e.target.id]:[e.target.value],
    });
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    login(formData)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-end justify-end text-sm">
            {/* <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label> */}

            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to={'/register'}className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;