"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/admin-login`,
        { email, password }
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        router.push("/admin/add-subscriber");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="!min-h-screen !flex !items-center !justify-center !bg-gradient-to-br from-gray-50 to-gray-100 !px-4 !py-8">
      <div className="!w-full !max-w-5xl !flex !flex-col md:!flex-row !bg-white !rounded-2xl !shadow-2xl !overflow-hidden !border !border-gray-100">
        {/* Left Image Section */}
        <div className="!hidden md:!block md:!w-1/2 !relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
          <img
            src="/assets/images/featuers/featuer1.jpg"
            alt="Admin Illustration"
            className="!h-[600px] !w-full !object-cover"
            width={600}
            height={400}
            
          />
         
        </div>

        {/* Right Form Section */}
        <div className="!w-full md:!w-1/2 !p-8 md:!p-12 !flex !flex-col !justify-center">
          <div className="!flex !justify-center !mb-8">
            <img
              src="https://miraggiolife.com/cdn/shop/files/Miraggio_Logo_1_1.png?v=1727936990&width=324"
              alt="Miraggiolife Logo"
              width={160}
              height={50}
              className="!h-12 !w-auto"
            />
          </div>

          <div className="!text-center !mb-8">
            <h2 className="!text-3xl !font-bold !text-gray-800 !mb-2">Admin Login</h2>
            <p className="!text-gray-500">Enter your credentials to access the admin dashboard</p>
          </div>

          {error && (
            <div className="!mb-6 !p-3 !bg-red-50 !text-red-700 !rounded-lg !flex !items-start !gap-2">
              <FiAlertCircle className="!mt-0.5 !flex-shrink-0" />
              <p className="!text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="!space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="!block !text-sm !font-medium !text-gray-700 !mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!w-full !pl-10 !pr-4 !py-3 !border !border-gray-300 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !placeholder-gray-400 !text-gray-800 !transition-colors"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="!block !text-sm !font-medium !text-gray-700 !mb-1">
                Password
              </label>
              <div className="relative">
                <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                  <FiLock className="!h-5 !w-5 !text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="!w-full !pl-10 !pr-12 !py-3 !border !border-gray-300 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !placeholder-gray-400 !text-gray-800 !transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="!absolute !inset-y-0 !right-0 !pr-3 !flex !items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="!h-5 !w-5 !text-gray-400 hover:!text-gray-600" />
                  ) : (
                    <FiEye className="!h-5 !w-5 !text-gray-400 hover:!text-gray-600" />
                  )}
                </button>
              </div>
            </div>

        

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="!w-full !py-3.5 !bg-blue-600 !text-white !rounded-lg !text-lg !font-semibold !shadow-md hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 !transition-colors !duration-300 disabled:!opacity-70 disabled:!cursor-not-allowed !flex !items-center !justify-center"
            >
              {loading ? (
                <>
                  <svg className="!animate-spin -!ml-1 !mr-3 !h-5 !w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>

          <div className="!mt-8 !text-center !text-sm !text-gray-500">
            <p>© {new Date().getFullYear()} Miraggiolife. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}