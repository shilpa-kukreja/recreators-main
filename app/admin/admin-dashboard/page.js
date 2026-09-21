"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Users,
  CreditCard,
  DollarSign,
  Mail,
  FileText,
  TrendingUp,
  Eye,
  Download,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  UserPlus,
  MessageCircle,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  RefreshCw,
  Plus,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";

// Mock data for charts and additional functionality
const mockChartData = {
  revenue: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
  subscribers: [45, 52, 38, 65, 72, 68, 85],
  timeline: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    careerForms: 0,
    payments: 0,
    pricing: 0,
    subscribers: 0,
    contacts: 0,
    revenue: 0,
  });

  const [recentData, setRecentData] = useState({
    subscribers: [],
    contacts: [],
    payments: []
  });

  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [exporting, setExporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      const [
        careerRes,
        paymentRes,
        pricingRes,
        subsRes,
        contactRes,
      ] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/carrer-forms`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/get`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/getprice`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriber/getsubscriber`),
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/contacts`),
      ]);

      const subscribers = subsRes.data.slice(0, 5);
      const contacts = contactRes.data.slice(0, 5);
      const payments = paymentRes.data.slice(0, 5);

      // Calculate total revenue from payments
      const totalRevenue = paymentRes.data.reduce((sum, payment) => sum + (payment.amount || 0), 0);

      setStats({
        careerForms: careerRes.data.length || 0,
        payments: paymentRes.data.length || 0,
        pricing: pricingRes.data.data?.length || 0,
        subscribers: subsRes.data.length || 0,
        contacts: contactRes.data.length || 0,
        revenue: totalRevenue,
      });

      setRecentData({
        subscribers,
        contacts,
        payments
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch admin data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshData = () => {
    setRefreshing(true);
    fetchStats();
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Enhanced export functionality
  const handleExportData = async (type = 'all') => {
    setExporting(true);
    try {
      toast.info(`Preparing ${type} data export...`);

      // Simulate API call for export
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create and download CSV
      const csvContent = generateCSV(type);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `admin-export-${type}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} data exported successfully!`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("❌ Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const generateCSV = (type) => {
    // Simplified CSV generation - in real app, this would format actual data
    const headers = {
      all: 'Type,Count,Revenue\nSubscribers,' + stats.subscribers + ',-\nPayments,' + stats.payments + ',' + stats.revenue,
      subscribers: 'Email,Date\n' + recentData.subscribers.map(s => `${s.email},${s.createdAt}`).join('\n'),
      payments: 'ID,Amount,Date\n' + recentData.payments.map(p => `${p._id},${p.amount},${p.createdAt}`).join('\n')
    };
    return headers[type] || headers.all;
  };

  // Enhanced StatCard with more functionality
  const StatCard = ({ title, value, icon, color, trend, percentage, description, onClick }) => (
    <div
      className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-6 hover:!shadow-xl !transition-all !duration-300 !group !transform hover:-!translate-y-1 !cursor-pointer"
      onClick={onClick}
    >
      <div className="!flex !items-center !justify-between">
        <div className="!flex-1">
          <p className="!text-sm !font-medium !text-gray-500 !mb-1 !uppercase !tracking-wide">{title}</p>
          <h3 className="!text-3xl !font-bold !text-gray-900 !mb-2">{value}</h3>
          {trend && (
            <div className={`!flex !items-center !text-sm !font-medium ${trend === 'up' ? '!text-green-600' : '!text-red-600'
              }`}>
              <div className={`!flex !items-center !px-2 !py-1 !rounded-full ${trend === 'up' ? '!bg-green-50' : '!bg-red-50'
                }`}>
                {trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span className="!ml-1">{percentage}%</span>
              </div>
              <span className="!text-gray-500 !ml-2 !text-xs">{description}</span>
            </div>
          )}
        </div>
        <div className={`!p-4 !rounded-2xl ${color} !text-white group-hover:!scale-110 !transition-transform !duration-300 !shadow-lg !relative`}>
          {icon}
          <div className="!absolute -!top-1 -!right-1 !w-3 !h-3 !bg-white !rounded-full !border-2 !border-blue-500 !opacity-0 group-hover:!opacity-100 !transition-opacity"></div>
        </div>
      </div>
    </div>
  );

  // Enhanced DataTable with more functionality
  const DataTable = ({ title, data, type, onViewAll }) => (
    <div className="!bg-white !rounded-2xl !shadow-lg !border !border-gray-100 !p-6">
      <div className="!flex !items-center !justify-between !mb-6">
        <div>
          <h3 className="!text-xl !font-bold !text-gray-900">{title}</h3>
          <p className="!text-sm !text-gray-500 !mt-1">Latest {type} records</p>
        </div>
        <div className="!flex !items-center !space-x-2">
          <Link
            href={
              type === 'subscribers'
                ? '/admin/add-subscriber'
                : type === 'contacts'
                  ? '/admin/admin-contact'
                  : '/admin/payment-list'
            }
            className="!text-gray-400 hover:!text-gray-600 !transition-colors !p-2 hover:!bg-gray-50 !rounded-lg"
          >


            <button
              onClick={onViewAll}
              className="!flex !items-center !text-sm !text-blue-600 hover:!text-blue-700 !font-medium !transition-colors"
            >
              View All <ChevronRight size={16} className="!ml-1" />
            </button>
            <button className="!text-gray-400 hover:!text-gray-600 !transition-colors !p-2 hover:!bg-gray-50 !rounded-lg">
              <MoreHorizontal size={20} />
            </button>
          </Link>
        </div>
      </div>

      <div className="!space-y-3">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="!flex !items-center !justify-between !p-4 hover:!bg-gray-50 !rounded-xl !transition-all !duration-200 !border !border-transparent hover:!border-gray-200 !cursor-pointer !group"
              onClick={() => toast.info(`Viewing ${type} details...`)}
            >
              <div className="!flex !items-center !space-x-4">
                <div className={`!p-3 !rounded-xl !shadow-sm group-hover:!scale-105 !transition-transform ${type === 'subscribers' ? '!bg-blue-50 !text-blue-600' :
                    type === 'contacts' ? '!bg-green-50 !text-green-600' :
                      '!bg-purple-50 !text-purple-600'
                  }`}>
                  {type === 'subscribers' ? <Mail size={18} /> :
                    type === 'contacts' ? <MessageCircle size={18} /> :
                      <CreditCard size={18} />}
                </div>
                <div>
                  <p className="!font-semibold !text-gray-900 group-hover:!text-blue-600 !transition-colors">
                    {type === 'subscribers' ? item.email :
                      type === 'contacts' ? item.name :
                        `Payment #${item._id?.slice(-8) || 'N/A'}`}
                  </p>
                  <p className="!text-sm !text-gray-500 !mt-1">
                    {type === 'subscribers' ? 'Newsletter subscription' :
                      type === 'contacts' ? item.email :
                        `₹${item.amount || '0'}`}
                  </p>
                </div>
              </div>
              <div className="!text-right">
                <p className="!text-sm !font-medium !text-gray-900">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p className={`!text-xs !font-medium !px-2 !py-1 !rounded-full !mt-1 ${type === 'payments' ? '!bg-green-100 !text-green-800' : '!bg-gray-100 !text-gray-800'
                  }`}>
                  {type === 'payments' ? 'Completed' : 'Active'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="!text-center !py-8">
            <div className="!text-gray-300 !mb-3">
              {type === 'subscribers' ? <Mail size={48} /> :
                type === 'contacts' ? <MessageCircle size={48} /> :
                  <CreditCard size={48} />}
            </div>
            <div className="!text-gray-400 !font-medium !mb-1">No data available</div>
            <div className="!text-sm !text-gray-500">Data will appear here when available</div>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Quick Actions with more functionality
  const QuickActions = () => (
    <div className="!bg-white !rounded-2xl !shadow-xl !border !border-gray-100 !p-6">
      <div className="!flex !items-center !justify-between !mb-8">
        <div>
          <h3 className="!text-2xl !font-bold !text-gray-900">Quick Actions</h3>
          <p className="!text-gray-500 !text-sm !mt-1">Frequently used administrative tasks</p>
        </div>
        <div className="!flex !items-center !space-x-3">
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="!p-3 !bg-blue-50 !rounded-xl !text-blue-600 hover:!bg-blue-100 !transition-colors disabled:!opacity-50"
          >
            <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <div className="!p-3 !bg-purple-50 !rounded-xl">
            <BarChart3 className="!text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="!grid !grid-cols-2 !gap-5">
        {[
          {
            label: "Add New Plan",
            icon: <DollarSign size={26} />,
            color: "!bg-gradient-to-br from-purple-500 to-purple-600",
            description: "Create pricing plans",
            onClick: () => {
              toast.success("🎯 Redirecting to plan creation...");
              // router.push('/admin/pricing/create');
            }
          },
          {
            label: "View Reports",
            icon: <FileText size={26} />,
            color: "!bg-gradient-to-br from-blue-500 to-blue-600",
            description: "Analytics & insights",
            onClick: () => {
              toast.success("📊 Opening advanced analytics...");
              // router.push('/admin/reports');
            }
          },
          {
            label: "Send Email",
            icon: <Mail size={26} />,
            color: "!bg-gradient-to-br from-green-500 to-green-600",
            description: "Bulk email campaign",
            onClick: () => {
              toast.success("📧 Launching email composer...");
              // setShowEmailModal(true);
            }
          },
          {
            label: "Export Data",
            icon: exporting ? <RefreshCw size={26} className="animate-spin" /> : <Download size={26} />,
            color: "!bg-gradient-to-br from-orange-500 to-orange-600",
            description: exporting ? "Exporting..." : "Download all data",
            onClick: () => !exporting && handleExportData('all'),
            disabled: exporting
          },
        ].map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className="!flex !flex-col !items-center !justify-center !p-6 !border-2 !border-gray-100 !rounded-2xl hover:!border-blue-200 hover:!shadow-2xl !transition-all !duration-300 !group !bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 transform hover:-translate-y-1 disabled:!opacity-50 disabled:!cursor-not-allowed disabled:!transform-none"
          >
            <div className={`!p-4 !rounded-2xl ${action.color} !text-white !mb-4 group-hover:!scale-110 group-hover:!rotate-3 !transition-all !duration-300 !shadow-lg group-hover:!shadow-xl`}>
              {action.icon}
            </div>
            <span className="!text-lg !font-bold !text-gray-900 !text-center !mb-2 group-hover:!text-blue-900 !transition-colors">
              {action.label}
            </span>
            <span className="!text-xs !text-gray-500 !text-center group-hover:!text-gray-600 !transition-colors">
              {action.description}
            </span>

            {/* Hover effect indicator */}
            <div className="!absolute !top-3 !right-3 !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-300">
              <div className="!w-2 !h-2 !bg-blue-500 !rounded-full !animate-pulse"></div>
            </div>
          </button>
        ))}
      </div>

      {/* Advanced Actions Section */}
      <div className="!mt-8 !pt-6 !border-t !border-gray-100">
        <div className="!flex !items-center !justify-between !mb-4">
          <h4 className="!text-lg !font-semibold !text-gray-900">Advanced Tools</h4>
          <Settings size={18} className="!text-gray-400" />
        </div>
        <div className="!grid !grid-cols-4 !gap-4">
          {[
            { label: "User Management", icon: <Users size={18} />, action: () => toast.info("👥 Opening user management...") },
            { label: "Bulk Export", icon: <Download size={18} />, action: () => handleExportData('all') },
            { label: "System Settings", icon: <Settings size={18} />, action: () => toast.info("⚙️ Opening system settings...") },
            { label: "API Docs", icon: <ExternalLink size={18} />, action: () => toast.info("📚 Opening API documentation...") },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="!flex !flex-col !items-center !p-4 !rounded-xl !border !border-gray-200 hover:!border-blue-300 hover:!bg-blue-50 !transition-all !duration-200 !group"
            >
              <div className="!p-3 !bg-gray-100 !rounded-lg !text-gray-600 group-hover:!bg-blue-100 group-hover:!text-blue-600 !transition-colors !mb-3">
                {item.icon}
              </div>
              <span className="!text-sm !font-medium !text-gray-700 group-hover:!text-gray-900 !text-center !leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="!flex !items-center !justify-center !h-screen !bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="!text-center">
            <div className="!animate-spin !rounded-full !h-20 !w-20 !border-4 !border-blue-600 !border-t-transparent !mx-auto !mb-6"></div>
            <p className="!text-2xl !font-bold !text-gray-700 !mb-2">Loading Dashboard</p>
            <p className="!text-gray-500">Preparing your analytics and insights...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const cards = [
    {
      title: "Total Subscribers",
      value: stats.subscribers.toLocaleString(),
      icon: <UserPlus size={28} />,
      color: "!bg-gradient-to-br from-blue-500 to-blue-600",
      trend: "up",
      percentage: 12,
      description: "vs last week",
      onClick: () => toast.info("📈 Viewing subscriber analytics...")
    },
    {
      title: "Successful Payments",
      value: stats.payments.toLocaleString(),
      icon: <CreditCard size={28} />,
      color: "!bg-gradient-to-br from-green-500 to-green-600",
      trend: "up",
      percentage: 8,
      description: "vs last week",
      onClick: () => toast.info("💳 Viewing payment analytics...")
    },
    {
      title: "Pricing Plans",
      value: stats.pricing,
      icon: <DollarSign size={28} />,
      color: "!bg-gradient-to-br from-purple-500 to-purple-600",
      onClick: () => toast.info("💰 Managing pricing plans...")
    },
    {
      title: "Career Applications",
      value: stats.careerForms.toLocaleString(),
      icon: <FileText size={28} />,
      color: "!bg-gradient-to-br from-orange-500 to-orange-600",
      trend: "down",
      percentage: 3,
      description: "vs last week",
      onClick: () => toast.info("📝 Viewing career applications...")
    },
    {
      title: "Contact Messages",
      value: stats.contacts.toLocaleString(),
      icon: <Mail size={28} />,
      color: "!bg-gradient-to-br from-pink-500 to-pink-600",
      trend: "up",
      percentage: 15,
      description: "vs last week",
      onClick: () => toast.info("📮 Viewing contact messages...")
    },
    {
      title: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: <TrendingUp size={28} />,
      color: "!bg-gradient-to-br from-indigo-500 to-indigo-600",
      trend: "up",
      percentage: 18,
      description: "vs last week",
      onClick: () => toast.info("📊 Viewing revenue analytics...")
    },
  ];

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 !p-6">
        {/* Header */}
        <div className="!mb-8">
          <div className="!flex !flex-col lg:!flex-row lg:!items-center lg:!justify-between">
            <div>
              <h1 className="!text-4xl !font-bold  !mb-3 !bg-gradient-to-r from-gray-900 to-blue-900 !bg-clip-text !text-transparent">
                Dashboard Overview
              </h1>
              <p className="!text-gray-600 !text-lg">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="!flex !items-center !space-x-4 !mt-6 lg:!mt-0">
              {/* <div className="!flex !bg-white !rounded-xl !border !border-gray-200 !p-1 !shadow-sm">
                {["day", "week", "month", "year"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`!px-4 !py-2 !rounded-lg !text-sm !font-medium !transition-all !duration-200 ${
                      timeRange === range
                        ? "!bg-gradient-to-r from-blue-600 to-indigo-600 !text-white !shadow-lg"
                        : "!text-gray-600 hover:!text-gray-900 hover:!bg-gray-50"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div> */}
              <button className="!bg-white border !border-gray-200 !rounded-xl !p-3 hover:!shadow-lg !transition-all !duration-200 !shadow-sm hover:!border-gray-300">
                <Calendar size={20} className="!text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-3 !gap-6 !mb-8">
          {cards.map((card, i) => (
            <StatCard
              key={i}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              trend={card.trend}
              percentage={card.percentage}
              description={card.description}
              onClick={card.onClick}
            />
          ))}
        </div>

        {/* Charts and Data Section */}
        <div className="!grid !grid-cols-1 xl:!grid-cols-1 !gap-6 !mb-8">
          {/* Quick Stats */}
          <div className="xl:!col-span-2 !grid !grid-cols-1 md:!grid-cols-2 !gap-6">
            <DataTable
              title="Recent Subscribers"
              data={recentData.subscribers}
              type="subscribers"
              onViewAll={() => toast.info("Viewing all subscribers...")}
            />
            <DataTable
              title="Recent Payments"
              data={recentData.payments}
              type="payments"
              onViewAll={() => toast.info("Viewing all payments...")}
            />
          </div>

          {/* Recent Messages */}
          <DataTable
            title="Recent Messages"
            data={recentData.contacts}
            type="contacts"
            onViewAll={() => toast.info("Viewing all messages...")}
          />
        </div>




      </div>
    </AdminLayout>
  );
}