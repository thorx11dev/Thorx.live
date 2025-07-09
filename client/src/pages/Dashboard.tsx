import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target,
  Activity,
  Calendar,
  Clock,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { CosmicDollarSign } from '../components/icons/CosmicIcons';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEarnings: 1547.50,
    todayEarnings: 102.21,
    totalTasks: 189,
    completedTasks: 183,
    activeUsers: 12847,
    successRate: 96.8
  });

  // COSMIC LIGHT MODE: High-contrast colors for optimal visibility
  const chartColors = {
    ads: '#5A67D8',      // Nebula Blue - Primary accent
    social: '#805AD5',   // Galactic Purple - Secondary accent  
    sites: '#38B2AC',    // Aurora Teal - Success accent
    total: '#F56565'     // Comet Red - Warning accent
  };

  // Synchronized with Work page data
  const [earningsData] = useState([
    { name: 'Mon', earnings: 89.50, ads: 45.50, social: 28.75, sites: 15.25 },
    { name: 'Tue', earnings: 104.00, ads: 52.75, social: 32.50, sites: 18.75 },
    { name: 'Wed', earnings: 96.50, ads: 38.25, social: 35.75, sites: 22.50 },
    { name: 'Thu', earnings: 107.50, ads: 61.50, social: 29.25, sites: 16.75 },
    { name: 'Fri', earnings: 109.50, ads: 48.75, social: 41.50, sites: 19.25 },
    { name: 'Sat', earnings: 115.00, ads: 55.25, social: 38.75, sites: 21.00 },
    { name: 'Sun', earnings: 93.50, ads: 42.50, social: 33.25, sites: 17.75 }
  ]);

  const [taskData] = useState([
    { name: 'Ads Cosmos', completed: 67, pending: 8 },
    { name: 'Social Cosmos', completed: 45, pending: 3 },
    { name: 'Site Cosmos', completed: 77, pending: 6 },
    { name: 'Other Tasks', completed: 12, pending: 2 }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayEarnings: prev.todayEarnings + (Math.random() * 2 - 1),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toFixed(2)}`,
      icon: CosmicDollarSign,
      bgColor: "bg-accent-primary",
      iconColor: "#ffffff",
      trend: "+15.2%"
    },
    {
      title: "Today's Earnings",
      value: `$${stats.todayEarnings.toFixed(2)}`,
      icon: TrendingUp,
      bgColor: "bg-accent-secondary",
      iconColor: "#ffffff",
      trend: "+12.8%"
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks.toLocaleString(),
      icon: Target,
      bgColor: "bg-accent-success",
      iconColor: "#ffffff",
      trend: "+8.7%"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: Award,
      bgColor: "bg-accent-warning",
      iconColor: "#ffffff",
      trend: "+3.1%"
    }
  ];

  // Enhanced tooltip component with better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-3 shadow-lg"
        >
          <p className="text-primary font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-primary font-medium">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              {`${entry.dataKey}: $${entry.value}`}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-3 shadow-lg"
        >
          <p className="text-primary font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-primary font-medium">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-secondary">Welcome back! Here's your cosmic earning overview.</p>
        </motion.div>

        {/* MOBILE-OPTIMIZED: Stats Cards - Single Column on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
              }}
              className="cosmic-card p-4 md:p-6 min-h-[80px] md:min-h-[120px]"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${card.bgColor}`}>
                  <card.icon className="w-5 h-5 md:w-6 md:h-6" color={card.iconColor} />
                </div>
                <span className="text-xs md:text-sm font-medium text-accent-success bg-green-50 px-2 md:px-3 py-1 rounded-full border border-green-100">
                  {card.trend}
                </span>
              </div>
              <div className="text-lg md:text-2xl font-bold text-primary mb-1">{card.value}</div>
              <div className="text-xs md:text-sm text-secondary">{card.title}</div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE-OPTIMIZED: Charts Section - Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Earnings Chart - Mobile Height Reduced */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
            }}
            className="cosmic-card p-4 md:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Weekly Cosmic Earnings</h3>
              <div className="flex items-center space-x-2 text-xs md:text-sm text-secondary bg-tertiary px-3 py-1 rounded-lg">
                <Activity className="w-3 h-3 md:w-4 md:h-4" />
                <span>Live Data</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200} className="md:!h-[250px]">
              <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.ads} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.social} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-secondary)" 
                  fontSize={12}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="var(--text-secondary)" 
                  fontSize={11}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke={chartColors.ads}
                  strokeWidth={3}
                  fill="url(#earningsGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Task Completion Chart - Mobile Height Reduced */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
            }}
            className="cosmic-card p-4 md:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Cosmic Task Completion</h3>
              <div className="flex items-center space-x-2 text-xs md:text-sm text-secondary bg-tertiary px-3 py-1 rounded-lg">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span>Real-time</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200} className="md:!h-[250px]">
              <BarChart data={taskData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-secondary)" 
                  fontSize={12}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="var(--text-secondary)" 
                  fontSize={11}
                  fontWeight={500}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="completed" fill={chartColors.sites} radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill={chartColors.total} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* MOBILE-OPTIMIZED: Recent Activity - Card-based Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
          }}
          className="cosmic-card p-4 md:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Recent Cosmic Activity</h3>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-secondary bg-tertiary px-3 py-1 rounded-lg">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span>Last 24 hours</span>
            </div>
          </div>
          <div className="space-y-3 md:space-y-4">
            {[
              {
                action: "Completed Social Cosmos Task",
                amount: "$6.75",
                time: "5 minutes ago",
                status: "completed",
                type: "social"
              },
              {
                action: "Watched Ads Cosmos Video",
                amount: "$3.50",
                time: "12 minutes ago",
                status: "completed",
                type: "ads"
              },
              {
                action: "Visited Site Cosmos Portal",
                amount: "$2.50",
                time: "28 minutes ago",
                status: "completed",
                type: "sites"
              },
              {
                action: "Started Instagram Engagement",
                amount: "$2.75",
                time: "45 minutes ago",
                status: "pending",
                type: "social"
              },
              {
                action: "Completed E-commerce Site Visit",
                amount: "$1.75",
                time: "1 hour ago",
                status: "completed",
                type: "sites"
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.01,
                  y: -2
                }}
                className="dashboard-activity-row flex items-center justify-between p-3 md:p-4 rounded-lg cursor-pointer min-h-[72px] overflow-hidden"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'ads' ? 'bg-soft-pink' :
                    activity.type === 'social' ? 'bg-pale-blue' :
                    'bg-light-teal'
                  }`}>
                    <span className="text-[#2D2D2D] text-xs md:text-sm font-bold">
                      {activity.type === 'ads' ? '📺' :
                       activity.type === 'social' ? '❤️' : '🌐'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="font-medium text-primary text-sm md:text-base truncate">{activity.action}</div>
                    <div className="text-xs md:text-sm text-secondary">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2 min-w-0">
                  <div className="font-bold text-primary text-sm md:text-base mb-1">{activity.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${
                    activity.status === 'completed' 
                      ? 'bg-green-50 text-green-800 border-green-200' 
                      : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;