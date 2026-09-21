"use client";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null); // ✅ added error state
  const [loading, setLoading] = useState(true); // ✅ added loading state

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`);
      if (response.data && Array.isArray(response.data)) {
        setBlogs(response.data);
        console.log("response.data", response.data);
      } else {
        setBlogs([]);
        setError("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
      setError("Failed to load blogs. Please try again later.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const value = {
    blogs,
    setBlogs,
    error,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
