"use client";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiUser,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ setToken }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Load theme preference
  useEffect(() => {
    const theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setDarkMode(theme === "dark");
  }, []);

  // Apply theme styles
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--nav-bg", "#1e293b");
      root.style.setProperty("--bg-color", "#0f172a");
      root.style.setProperty("--text-color", "#f8fafc");
      root.style.setProperty("--border-color", "#334155");
      root.style.setProperty("--hover-color", "#334155");
      root.style.setProperty("--dropdown-bg", "#1e293b");
      root.style.setProperty("--dropdown-hover", "#334155");
      root.style.setProperty("--shadow-color", "rgba(0, 0, 0, 0.3)");
      localStorage.setItem("theme", "dark");
    } else {
      root.style.setProperty("--nav-bg", "#ffffff");
      root.style.setProperty("--bg-color", "#f8fafc");
      root.style.setProperty("--text-color", "#0f172a");
      root.style.setProperty("--border-color", "#e2e8f0");
      root.style.setProperty("--hover-color", "#f1f5f9");
      root.style.setProperty("--dropdown-bg", "#ffffff");
      root.style.setProperty("--dropdown-hover", "#f1f5f9");
      root.style.setProperty("--shadow-color", "rgba(0, 0, 0, 0.1)");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleNotificationClick = () => {
    setHasNotifications(false);
    // Placeholder: open a notification drawer/modal
    console.log("Open notification panel");
  };

  const handleInfoClick = () => router.push("/about");

  return (
    <>
      <nav className="!sticky !top-0 !z-50 !w-full !border-b !border-[var(--border-color)] !bg-[var(--nav-bg)] !backdrop-blur-lg !bg-opacity-95 !transition-all !duration-300 !shadow-sm">
        <div className="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="!flex !h-16 !items-center !justify-between">
            {/* Logo and Mobile Menu Button */}
            <div className="!flex !items-center">
              <button
                onClick={toggleMobileMenu}
                className="md:!hidden !p-2 !rounded-md !text-[var(--text-color)] !mr-2"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? (
                  <FiX className="!h-6 !w-6" />
                ) : (
                  <FiMenu className="!h-6 !w-6" />
                )}
              </button>
              
              <Link href="/" className="!flex !items-center !gap-2 !group">
                <img
                  src="/assets/images/logos/RCLogo.png"
                  alt="Recreators Design Logo"
                  className="!w-5  sm:!w-32 !transition-transform !duration-300 group-hover:!scale-105"
                />
                
              </Link>
            </div>

           

            {/* Right Controls */}
            <div className="!flex !items-center !gap-2 sm:!gap-3">
              {/* Search */}
              <div className={`!relative ${showSearch ? '!flex' : '!hidden md:!block'}`}>
                {showSearch ? (
                  <div className="!flex !items-center">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="!w-full md:!w-56 !pl-10 !pr-4 !py-2 !bg-[var(--bg-color)] !border !border-[var(--border-color)] !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !text-[var(--text-color)]"
                    />
                    <button
                      onClick={() => setShowSearch(false)}
                      className="!ml-2 !p-1.5 !rounded-md hover:!bg-[var(--hover-color)] !text-[var(--text-color)]"
                    >
                      <FiX className="!h-4 !w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    className="!p-2 !rounded-md hover:!bg-[var(--hover-color)] !text-[var(--text-color)] !transition-colors"
                    aria-label="Search"
                  >
                    <FiSearch className="!h-5 !w-5" />
                  </button>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="!p-2 !rounded-md hover:!bg-[var(--hover-color)] !text-[var(--text-color)] !transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FiSun className="!h-5 !w-5" />
                ) : (
                  <FiMoon className="!h-5 !w-5" />
                )}
              </button>

              {/* Notifications */}
              <div className="!relative">
                <button
                  onClick={handleNotificationClick}
                  className="!p-2 !rounded-md hover:!bg-[var(--hover-color)] !text-[var(--text-color)] !relative !transition-colors"
                  aria-label="Notifications"
                >
                  <FiBell className="!h-5 !w-5" />
                  {hasNotifications && (
                    <span className="!absolute !top-1.5 !right-1.5 !flex !h-2 !w-2">
                      <span className="!animate-ping !absolute !inline-flex !h-full !w-full !rounded-full !bg-red-400 !opacity-75"></span>
                      <span className="!relative !inline-flex !rounded-full !h-2 !w-2 !bg-red-500"></span>
                    </span>
                  )}
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="!relative !ml-1">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="!flex !items-center !rounded-full !bg-gradient-to-r from-blue-500 to-indigo-600 !p-1 !text-sm !transition-all hover:!from-blue-600 hover:!to-indigo-700 focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!ring-offset-2 focus:!ring-offset-[var(--nav-bg)]"
                >
                  <div className="!h-8 !w-8 !rounded-full !bg-white !flex !items-center !justify-center">
                    <FiUser className="!h-4 !w-4 !text-blue-600" />
                  </div>
                  <span className="!ml-2 !hidden sm:!inline-block !text-sm !font-medium !text-white">
                    Admin
                  </span>
                  <svg
                    className={`!ml-1 !h-4 !w-4 !text-white !transition-transform !duration-200 ${showDropdown ? "!rotate-180" : ""
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {showDropdown && (
                  <div
                    className="!absolute !right-0 !mt-2 !w-48 !origin-top-right !rounded-lg !bg-[var(--dropdown-bg)] !shadow-lg !ring-1 !ring-black !ring-opacity-5 !border !border-[var(--border-color)] !overflow-hidden !py-1"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="!px-4 !py-2 !border-b !border-[var(--border-color)]">
                      <p className="!text-sm !font-medium !text-[var(--text-color)]">Admin User</p>
                      <p className="!text-xs !text-gray-500">admin@miraggiolife.com</p>
                    </div>
                    
                    <div className="!py-1">
                      <Link
                        href="/admin/profile"
                        className="!flex !items-center !px-4 !py-2 !text-sm !text-[var(--text-color)] hover:!bg-[var(--dropdown-hover)] !transition"
                      >
                        <FiUser className="!mr-3 !h-4 !w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="!flex !items-center !px-4 !py-2 !text-sm !text-[var(--text-color)] hover:!bg-[var(--dropdown-hover)] !transition"
                      >
                        <FiSettings className="!mr-3 !h-4 !w-4" />
                        Settings
                      </Link>
                    </div>
                    
                    <div className="!border-t !border-[var(--border-color)] !pt-1">
                      <button
                        onClick={() => {
                          localStorage.removeItem("adminToken");
                          window.location.href = "/admin/login";
                        }}
                        className="!flex !w-full !items-center !px-4 !py-2 !text-sm !text-red-600 hover:!bg-red-50 !transition"
                      >
                        <FiLogOut className="!mr-3 !h-4 !w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--nav-bg)]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/admin/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/admin/categories"
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/admin/orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Orders
              </Link>
              
              <div className="pt-4 pb-3 border-t border-[var(--border-color)]">
                <div className="flex items-center px-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-[var(--text-color)]">Admin User</div>
                    <div className="text-sm font-medium text-gray-500">admin@miraggiolife.com</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/admin/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("adminToken");
                      window.location.href = "/admin/login";
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;