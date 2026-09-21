"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiTag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiPlus,   
  FiVideo,
  FiList,
  FiShoppingCart,
  FiMail,
  FiBell,
  FiBook,
  FiGift,
  FiUser,
  FiLayers
} from "react-icons/fi";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Dashboard", href: "/admin/admin-dashboard", icon: FiHome },
  { 
    name: "Payments", 
    href: "/admin/payment-list", 
    icon: FiBarChart2,
  },
  { 
    name: "Portfolio", 
    icon: FiBox,
    submenu: [
      { name: "List Portfolio", href: "/admin/list-portfolio", icon: FiList },
      { name: "Add Portfolio", href: "/admin/add-portfolio", icon: FiPlus }
    ]
  },
  { 
    name: "Categories", 
    icon: FiLayers,
    submenu: [
      { name: "List Categories", href: "/admin/list-category", icon: FiList },
      { name: "Add Category", href: "/admin/add-category", icon: FiPlus }
    ]
  },
  { 
    name: "Plans", 
    icon: FiTag,
    submenu: [
      { name: "List Plans", href: "/admin/list-price", icon: FiList },
      { name: "Add Plan", href: "/admin/add-price", icon: FiPlus }
    ]
  },
  { 
    name: "Carrers", 
    icon: FiGift,
    submenu: [
      { name: "List Carrer", href: "/admin/list-carrer", icon: FiList },
      { name: "Add Carrer", href: "/admin/add-carrer", icon: FiPlus }
    ]
  },
 { name: "AdminCarrerForm", href: "/admin/admin-career-form-list", icon: FiUser },
  {
    name: "Blogs",
    icon: FiBook,
    submenu: [
      { name: "List Blogs", href: "/admin/list-blog", icon: FiList },
      { name: "Add Blog", href: "/admin/add-blog", icon: FiPlus }
    ]
  },
  { name: "Contacts", href: "/admin/admin-contact", icon: FiMail },
  { name: "Subscribers", href: "/admin/add-subscriber", icon: FiBell },
  {
    name: "Coupons",
    icon: FiGift,
    submenu: [
      { name: "List Coupons", href: "/admin/list-coupon", icon: FiList },
      { name: "Add Coupon", href: "/admin/add-coupon", icon: FiPlus }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-expand submenu if current path matches
  useEffect(() => {
    const newOpenSubmenus = {};
    
    menuItems.forEach(item => {
      if (item.submenu) {
        const isActive = item.submenu.some(subItem => pathname === subItem.href);
        if (isActive) {
          newOpenSubmenus[item.name] = true;
        }
      }
    });
    
    setOpenSubmenus(newOpenSubmenus);
  }, [pathname]);

  const toggleSubmenu = (name) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <aside className={`!bg-gradient-to-b from-gray-900 to-gray-800 !text-white !flex !flex-col !h-screen !sticky !top-0 !transition-all !duration-300 ${isCollapsed ? '!w-20' : '!w-64'}`}>
      {/* Logo and Toggle */}
      <div className="!h-20 !flex !items-center !justify-between !px-4 !border-b !border-gray-700">
        {!isCollapsed && (
          <h1 className="!text-xl !font-bold !text-white !tracking-wide">
            Recreaters<span className="!text-blue-400">Admin</span>
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="!p-2 !rounded-lg hover:!bg-gray-700 !transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <FiChevronRight className="!text-white !text-lg" />
          ) : (
            <FiChevronDown className="!text-white !text-lg !transform !rotate-90" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="!flex-1 !p-4 !space-y-1 !mt-2 overflow-y-auto scrollbar-hide scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const hasSubmenu = item.submenu;
          const isSubmenuOpen = openSubmenus[item.name];
          
          // Check if any submenu item is active
          const isSubmenuItemActive = hasSubmenu && 
            item.submenu.some(subItem => pathname === subItem.href);

          return (
            <div key={item.name}>
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`!flex !items-center !w-full !px-4 !py-3 !rounded-xl !transition-all !duration-200 !group ${
                      isSubmenuItemActive
                        ? "!bg-blue-600/20 !text-white !border-r-2 !border-blue-500"
                        : "!text-gray-300 hover:!bg-gray-700 hover:!text-white"
                    } ${isCollapsed ? '!justify-center' : '!justify-between'}`}
                  >
                    <div className="!flex !items-center !gap-3">
                      <Icon
                        className={`!text-lg ${
                          isSubmenuItemActive ? "!text-blue-400" : "!text-gray-400 group-hover:!text-white"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="!font-medium">{item.name}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      isSubmenuOpen ? (
                        <FiChevronDown className="!text-sm !transition-transform !duration-300" />
                      ) : (
                        <FiChevronRight className="!text-sm !transition-transform !duration-300" />
                      )
                    )}
                  </button>
                  
                  {!isCollapsed && isSubmenuOpen && (
                    <div className="!ml-4 !pl-6 !border-l !border-gray-700 !space-y-1 !mt-1">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isActive = pathname === subItem.href;
                        
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`!flex !items-center !gap-3 !px-3 !py-2.5 !rounded-lg !transition-all !duration-200 !group ${
                              isActive
                                ? "!text-blue-400 !bg-blue-600/10 !border-r-2 !border-blue-500"
                                : "!text-gray-400 hover:!text-white hover:!bg-gray-700/50"
                            }`}
                          >
                            <SubIcon className="!text-sm" />
                            <span className="!text-sm">{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`!flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !transition-all !duration-200 !group ${
                    active
                      ? "!bg-blue-600 !text-white !shadow-lg"
                      : "!text-gray-300 hover:!bg-gray-700 hover:!text-white"
                  } ${isCollapsed ? '!justify-center' : ''}`}
                >
                  <Icon
                    className={`!text-lg ${
                      active ? "!text-white" : "!text-gray-400 group-hover:!text-white"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="!font-medium">{item.name}</span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* User & Logout Section */}
      <div className="!p-4 !border-t !border-gray-700">
        {!isCollapsed && (
          <div className="!flex !items-center !gap-3 !px-4 !py-3 !mb-2 !rounded-lg !bg-gray-700/50">
            <div className="!w-10 !h-10 !rounded-full !bg-gradient-to-r from-blue-500 to-indigo-600 !flex !items-center !justify-center !text-white !font-medium">
              <FiUser className="text-lg" />
            </div>
            <div className="!flex-1 !min-w-0">
              <p className="!text-sm !font-medium !truncate">Admin User</p>
              <p className="!text-xs !text-gray-400 !truncate">admin@miraggio.com</p>
            </div>
          </div>
        )}
        
        {isCollapsed ? (
          <button
            className="!flex !items-center !justify-center !w-full !p-3 !rounded-lg !text-gray-300 hover:!bg-red-600/10 hover:!text-red-400 !transition-all !duration-300 !group"
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            aria-label="Logout"
          >
            <FiLogOut className="!text-lg !transform group-hover:!scale-110 !transition-transform" />
          </button>
        ) : (
          <button
            className="!flex !items-center !gap-3 !w-full !px-4 !py-3 !rounded-lg !text-gray-300 hover:!bg-red-600/10 hover:!text-red-400 !transition-all !duration-300 !group"
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
          >
            <FiLogOut className="!text-lg !transform group-hover:!scale-110 !transition-transform" />
            <span className="!font-medium">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}