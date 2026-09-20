import React, { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  Filter,
  Eye,
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link, Links } from "react-router-dom";
import NotificationIcon from './NotificationIcon';
import DarkModeToggle from "./DarkModeToggle";

// Simple UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      variant === "outline"
        ? "border border-gray-200 bg-white hover:bg-gray-50"
        : "bg-blue-600 text-white hover:bg-blue-700"
    } ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 ${className}`}
    {...props}
  />
);

const Select = ({ children, value, onChange, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 ${className}`}
  >
    {children}
  </select>
);

const Badge = ({ children, color = "gray" }) => {
  const colors = {
    yellow: "bg-yellow-500 text-white",
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    red: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
};



const colorMap = {
  green: "text-green-600",
  yellow: "text-yellow-600",
  blue: "text-blue-600",
  red: "text-red-600",
  gray: "text-gray-600",
};

const StatsCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const colorClass = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white/80 border-black border-1 p-7 rounded-2xl shadow-md flex items-center justify-between transition hover:scale-105 hover:shadow-lg">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
      </div>
      <Icon className={`h-10 w-10 ${colorClass}`} />
    </div>
  );
};


const FilterBar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  selectedDate,
  setSelectedDate,
}) => (
  <Card>
    <div className="space-y-5">
      <div className="flex">  <h3 className="text-lg font-semibold">Filters</h3> <Filter className="text-gray-800 text-2xl"/></div>
    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border hover:shadow-sm transition">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-0 focus:ring-0 bg-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="bg-gray-50 rounded-lg px-3 py-2 border hover:shadow-sm transition">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full border-0 focus:ring-0 focus:ring-red-400 bg-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="resolved">Resolved</option>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="bg-gray-50 rounded-lg px-3 py-2 border hover:shadow-sm transition focus:ring-0 focus:ring-red-400 ">
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            className="w-full border-0 focus:ring-0 focus:ring-red-400 bg-transparent"
          >
            <option value="all">All Types</option>
            <option value="fire outbreak">Fire</option>
            <option value="harassment">Harassment</option>
            <option value="Assault">Assault</option>
            <option value="bullying">Bullying</option>
            <option value="other">Other</option>
          </Select>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border hover:shadow-sm transition">
      
          <Input
            type="date"
            value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
            onChange={(e) =>
              setSelectedDate(e.target.value ? new Date(e.target.value) : null)
            }
            className="flex-1 border-0 focus:ring-0 bg-transparent"
          />
        </div>
      </div>

      {/* Clear Button */}
      {(statusFilter !== "all" ||
        typeFilter !== "all" ||
        searchQuery ||
        selectedDate) && (
        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => {
              setStatusFilter("all");
              setTypeFilter("all");
              setSearchQuery("");
              setSelectedDate(null);
            }}
            className="w-full md:w-auto bg-amber-400"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  </Card>
);


const ReportsTable = ({ reports, updateReportStatus, onViewReport }) => {
  const getStatusColor = (status) =>
    ({
      pending: "yellow",
      "inprogress": "blue",
      resolved: "green",
    })[status];


  

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">
        Submitted Reports ({reports.length})
      </h3>
      <div className="overflow-x-auto rounded-xl border border-pink-100 shadow-sm ">
        <table className="w-full text-sm border-collapse ">
          <thead className="w-full bg-gradient-to-r from-pink-100 to-rose-100 border-b border-pink-200">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Location</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
              <th className="text-left p-2">View</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const isSpam = report.type && report.type.toUpperCase() === "SPAM";
              return (
                <tr
                  key={report.id}
                  className={
                    `border-b text-left p-3 font-semibold uppercase tracking-wide text-xs ` +
                    (isSpam
                      ? "bg-red-600 text-white hover:bg-red-800"
                      : "hover:bg-gray-100 text-gray-700")
                  }
                >
                  <td className="p-2 font-medium">{report.id}</td>
                  <td className="p-2">{report.type}</td>
                  <td className="p-2 max-w-xs truncate">{report.description}</td>
                  <td className="p-2">{report.location}</td>
                  <td className="p-2">
                    {report.dateReported.toLocaleDateString()}
                  </td>
                  <td className="p-2 cursor-pointer">
                    <Badge color={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Select
                      value={report.status}
                      onChange={(value) => updateReportStatus(report.id, value)}
                      className="w-32"
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">InProgress</option>
                      <option value="resolved">Resolved</option>
                    </Select>
                  </td>
                  <td className="p-2">
                    <button
                      className="p-2 rounded hover:bg-blue-50 text-blue-600"
                      title="View Report"
                      onClick={() => onViewReport && onViewReport(report)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const ChartCard = ({ title, children }) => (
  <Card>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </Card>
);

function CrimeAdminDashboard() {
  const [viewedReport, setViewedReport] = useState(null);
  const [showActionForm, setShowActionForm] = useState(false);

  // Convex hooks
  const reportsData = useQuery(api.Fetchreport.Fetchreport);
  const updateStatusMutation = useMutation(api.updateReportStatus.updateReportStatus);
  
  // State hooks - MUST be called before any conditional returns
  const [activeTab, setActiveTab] = useState("reports");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
const [darkMode, setDarkMode] = useState(false);
  // Transform Convex data to component format
  const reports = useMemo(() => {
    if (!reportsData) return [];
    return reportsData.map((r) => ({
      id: r._id,
      type: r.incidentType,
      description: r.description,
      location: r.location,
  image: r.image,
      status: r.status,
      dateReported: new Date(r._creationTime)
    }));
  }, [reportsData]);

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;
      const matchesType = typeFilter === "all" || report.type === typeFilter;
      const matchesSearch =
        searchQuery === "" ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate =
        !selectedDate ||
        report.dateReported.toDateString() === selectedDate.toDateString();
      return matchesStatus && matchesType && matchesSearch && matchesDate;
    });
  }, [reports, statusFilter, typeFilter, searchQuery, selectedDate]);

  // Calculate stats
  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((r) => r.status === "pending").length,
      inProgress: reports.filter((r) => r.status === "inprogress").length,
      resolved: reports.filter((r) => r.status === "resolved").length,
    }),
    [reports]
  );

  // Chart data
  const chartData = useMemo(() => {
    const typeCount = reports.reduce((acc, report) => {
      acc[report.type] = (acc[report.type] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(typeCount).map(([type, count]) => ({ type, count }));
  }, [reports]);

  const statusData = useMemo(() => {
    const statusCount = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
    }));
  }, [reports]);

  const timelineData = useMemo(() => {
    const dateCount = reports.reduce((acc, report) => {
      const date = report.dateReported.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(dateCount).map(([date, count]) => ({
      date,
      reports: count,
    }));
  }, [reports]);

  // Handle loading state AFTER all hooks are declared
  if (reportsData === undefined) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        {/* Glowing Spinner */}
        <div className="relative">
          <div className="h-28 w-28 rounded-full border-t-4 border-pink-500 border-solid animate-spin"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 blur-xl opacity-30"></div>
        </div>

        {/* Loading Text */}
        <p className="text-lg font-semibold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Loading Reports...
        </p>
      </div>
    </div>
  );
}


  // Update report status using Convex mutation
  const updateReportStatus = async (id, newStatus) => {
    try {
      await updateStatusMutation({ id, status: newStatus });
    } catch (error) {
      console.error("Failed to update report status:", error);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const tabs = [
    { id: "reports", label: "Reports" },
    { id: "analytics", label: "Analytics" },
    { id: "map", label: "Heat Map" },
  ];

  return (
  <div className={`min-h-screen p-6 transition-colors duration-300 ${
  darkMode 
    ? 'bg-black' 
    : 'bg-gray-50'
}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
<div className="flex items-center justify-between space-x-3">
  <div className="flex items-center space-x-3">
    <img
      src="/images/logo.png"
      alt="Astra Logo"
      className="w-10 h-10 rounded-xl shadow-sm"
    />
    <div>
      <h1 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent`}>
        Astra Admin Dashboard
      </h1>
      <p className={`text-sm sm:text-base transition-colors ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Monitor and manage reports across your campus, city & company
      </p>
    </div>
  </div>
  
  <div className="flex items-center gap-2.5">
    <NotificationIcon reports={reports} />
    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
  </div>
</div>



        {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <StatsCard
    title="Total Reports"
    value={stats.total}
    icon={TrendingUp}
  color="red"
  
  />
  <StatsCard
    title="Pending"
    value={stats.pending}
    icon={Clock}
   color="yellow" 
   
  />
  <StatsCard
    title="In Progress"
    value={stats.inProgress}
    icon={AlertTriangle}
    gradient="from-blue-500/20 to-indigo-500/10"
    
  />
  <StatsCard
    title="Resolved"
    value={stats.resolved}
    icon={CheckCircle}
   color="green" 
   
  />
</div>


        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-md w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-red-400 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "reports" && (
            <div className="space-y-6">
              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <ReportsTable
                reports={filteredReports}
                updateReportStatus={updateReportStatus}
                onViewReport={setViewedReport}
              />

              
              {/* Modal for viewing report details */}
            {viewedReport && (
  <AnimatePresence>
    <>

    
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-rose-900/30 backdrop-blur-md z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setViewedReport(null)}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full h-[80vh] max-w-3xl overflow-scroll border border-rose-100">
          {/* Image Section */}
          {viewedReport?.image && (
            <motion.div
              className="w-full max-h-96 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={viewedReport.image}
                alt="Report"
                className="object-cover w-full h-full rounded-t-2xl"
              />
            </motion.div>
          )}

          {/* Content Section */}
          <div className="p-6 space-y-4">
            <motion.h2
              className="text-2xl font-bold text-rose-600"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {viewedReport?.title || "Report Details"}
            </motion.h2>

            <motion.div
              className="space-y-2 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>
                <span className="font-semibold text-rose-500">Incident Type:</span>{" "}
                {viewedReport?.type}
              </p>
              <p>
                <span className="font-semibold text-rose-500">Location:</span>{" "}
                {viewedReport?.location}
              </p>
              <p>
                <span className="font-semibold text-rose-500">Description:</span>{" "}
                {viewedReport?.description}
              </p>
              <p>
                <span className="font-semibold text-rose-500">Status:</span>{" "}
                {viewedReport?.status}
              </p>
              <p>
                <span className="font-semibold text-rose-500">Reported On:</span>{" "}
                {viewedReport?.dateReported?.toLocaleString()}
              </p>
            </motion.div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <motion.button
                onClick={() => setViewedReport(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer x-6 py-2 px-4 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-500 transition-colors hover:text-black"
              >
                Close
              </motion.button>
             {
              <Link
              to="/actionform">
    <motion.button
      onClick={() => setShowActionForm(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg shadow-md hover:from-rose-600 hover:to-rose-700 transition-all"
    >
      Take Action
    </motion.button>
    </Link>
  }
            </div>
          </div>
        </div>
      </motion.div>
    </>
  </AnimatePresence>
)}

            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Reports by Crime Type">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" stroke="#FBCFE8" />
  <XAxis dataKey="type" tick={{ fill: "#BE185D", fontSize: 12 }} />
  <YAxis tick={{ fill: "#BE185D", fontSize: 12 }} />
  <Tooltip contentStyle={{ backgroundColor: "#FEE2E2", borderRadius: 8 }} />
  <Bar
    dataKey="count"
    radius={[6, 6, 0, 0]}
    fill="url(#barGradient)"
    animationDuration={800}
  />
  <defs>
    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F472B6" stopOpacity={0.9} />
      <stop offset="100%" stopColor="#FB7185" stopOpacity={0.6} />
    </linearGradient>
  </defs>
</BarChart>

              </ChartCard>

              <ChartCard title="Status Distribution">
                <PieChart>
  <Pie
    data={statusData}
    dataKey="count"
    cx="50%"
    cy="50%"
    innerRadius={40}
    outerRadius={80}
    paddingAngle={5}
    cornerRadius={8}
    label={({ status, count }) => `${status}: ${count}`}
  >
    {statusData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip contentStyle={{ backgroundColor: "#FECACA", borderRadius: 8 }} />
</PieChart>

              </ChartCard>

           <div className="col-span-2">
  <ChartCard title="Reports Timeline">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={timelineData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#FBCFE8" />
        <XAxis dataKey="date" tick={{ fill: "#BE185D", fontSize: 12 }} />
        <YAxis tick={{ fill: "#BE185D", fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: "#FECACA", borderRadius: 8 }} />
        <Line
          type="monotone"
          dataKey="reports"
          stroke="#F472B6"
          strokeWidth={3}
          dot={{ fill: "#FB7185", r: 4 }}
          activeDot={{ fill: "#BE185D", r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </ChartCard>
</div>


            </div>
          )}

          {activeTab === "map" && (
            <Card>
              <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Report Heat Map
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Areas with highest  report concentrations
              </p>

              <div className="space-y-3">
                {(() => {
                  const locationCount = reports.reduce((acc, report) => {
                    acc[report.location] = (acc[report.location] || 0) + 1;
                    return acc;
                  }, {});
                  const maxCount = Math.max(...Object.values(locationCount));

                  return Object.entries(locationCount).map(
                    ([location, count]) => (
                      <div
                        key={location}
                        className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-800">
                            {location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 w-48">
                          <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-red-500 h-3 rounded-full"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {count}
                          </span>
                        </div>
                      </div>
                    )
                  );
                })()}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default CrimeAdminDashboard;