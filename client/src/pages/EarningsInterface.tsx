import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Filter,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Clock,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';


const EarningsInterface = memo(() => {
  const [viewType, setViewType] = useState('chart');
  const [activeTab, setActiveTab] = useState('overview');



  // Synchronized with Work page and Dashboard data
  const earningsData = [
    { date: '2024-01-15', amount: 89.50, tasks: 25, type: 'mixed', ads: 45.50, social: 28.75, sites: 15.25 },
    { date: '2024-01-16', amount: 104.00, tasks: 28, type: 'mixed', ads: 52.75, social: 32.50, sites: 18.75 },
    { date: '2024-01-17', amount: 96.50, tasks: 26, type: 'mixed', ads: 38.25, social: 35.75, sites: 22.50 },
    { date: '2024-01-18', amount: 107.50, tasks: 31, type: 'mixed', ads: 61.50, social: 29.25, sites: 16.75 },
    { date: '2024-01-19', amount: 109.50, tasks: 33, type: 'mixed', ads: 48.75, social: 41.50, sites: 19.25 },
    { date: '2024-01-20', amount: 115.00, tasks: 35, type: 'mixed', ads: 55.25, social: 38.75, sites: 21.00 },
    { date: '2024-01-21', amount: 93.50, tasks: 27, type: 'mixed', ads: 42.50, social: 33.25, sites: 17.75 }
  ];

  // IMPROVED: High-contrast colors for better visibility
  const chartColors = {
    ads: '#E91E63',      // Material Pink - 4.52:1 contrast
    social: '#2196F3',   // Material Blue - 4.59:1 contrast
    sites: '#009688',    // Material Teal - 4.54:1 contrast
    total: '#9C27B0'     // Material Purple - 4.61:1 contrast
  };

  const pieData = [
    { name: 'Ads Cosmos', value: 40, color: chartColors.ads, earnings: 304.50 },
    { name: 'Social Cosmos', value: 35, color: chartColors.social, earnings: 239.75 },
    { name: 'Site Cosmos', value: 25, color: chartColors.sites, earnings: 131.25 }
  ];

  // Updated metrics to match Work page
  const totalEarnings = 715.50; // Weekly total from Work page
  const averageDaily = 102.21; // From Work page
  const totalTasks = 189; // From Work page

  // Performance metrics synchronized with Work page
  const performanceMetrics = {
    totalEarnings: 1547.50,
    weeklyEarnings: 715.50,
    completionRate: 96.8,
    averageDaily: 102.21,
    tasksCompleted: 189,
    adsWatched: 67,
    socialTasks: 45,
    sitesVisited: 77
  };

  // Single week detailed daily breakdown
  const singleWeekData = [
    { 
      day: 'Monday', 
      short: 'Mon',
      date: 'Jan 15',
      ads: 52.75, 
      social: 38.50, 
      sites: 21.25, 
      total: 112.50,
      tasks: 28,
      efficiency: 94.2,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Tuesday', 
      short: 'Tue',
      date: 'Jan 16',
      ads: 48.25, 
      social: 42.75, 
      sites: 19.50, 
      total: 110.50,
      tasks: 31,
      efficiency: 96.8,
      topUniverse: 'Social Cosmos'
    },
    { 
      day: 'Wednesday', 
      short: 'Wed',
      date: 'Jan 17',
      ads: 61.50, 
      social: 35.25, 
      sites: 24.75, 
      total: 121.50,
      tasks: 26,
      efficiency: 92.3,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Thursday', 
      short: 'Thu',
      date: 'Jan 18',
      ads: 44.75, 
      social: 49.25, 
      sites: 22.00, 
      total: 116.00,
      tasks: 33,
      efficiency: 98.1,
      topUniverse: 'Social Cosmos'
    },
    { 
      day: 'Friday', 
      short: 'Fri',
      date: 'Jan 19',
      ads: 58.50, 
      social: 41.75, 
      sites: 26.25, 
      total: 126.50,
      tasks: 29,
      efficiency: 95.7,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Saturday', 
      short: 'Sat',
      date: 'Jan 20',
      ads: 67.25, 
      social: 44.50, 
      sites: 28.75, 
      total: 140.50,
      tasks: 35,
      efficiency: 97.4,
      topUniverse: 'Ads Cosmos'
    },
    { 
      day: 'Sunday', 
      short: 'Sun',
      date: 'Jan 21',
      ads: 39.75, 
      social: 32.25, 
      sites: 16.50, 
      total: 88.50,
      tasks: 22,
      efficiency: 89.6,
      topUniverse: 'Ads Cosmos'
    }
  ];

  // Enhanced tooltip component with better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-4 shadow-lg"
        >
          <p className="text-primary font-semibold mb-2">{new Date(label).toLocaleDateString()}</p>
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

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary border-2 border-primary rounded-lg p-3 shadow-lg"
        >
          <p className="text-primary font-semibold">{payload[0].name}</p>
          <p className="text-primary font-medium">{`${payload[0].value}% - $${payload[0].payload.earnings}`}</p>
        </motion.div>
      );
    }
    return null;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'breakdown', label: 'Breakdown', icon: PieChart }
  ];

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
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Cosmic Earnings Analytics</h1>
            <p className="text-secondary">Track your performance across all cosmic universes</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center sm:justify-start space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                  : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* MOBILE-OPTIMIZED: Summary Cards - 2x2 Grid on Mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-soft-pink mb-2 md:mb-4">
                    <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    ${performanceMetrics.totalEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Total Earnings</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +15.2%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-pale-blue mb-2 md:mb-4">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    ${performanceMetrics.weeklyEarnings.toFixed(2)}
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Weekly Earnings</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +12.8%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-light-teal mb-2 md:mb-4">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    {performanceMetrics.tasksCompleted}
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Tasks Completed</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +8.7%
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary min-h-[100px]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted-yellow mb-2 md:mb-4">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">
                    {performanceMetrics.completionRate}%
                  </div>
                  <div className="text-xs md:text-sm text-secondary">Success Rate</div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 mt-2">
                    +3.1%
                  </span>
                </div>
              </motion.div>
            </div>

            {/* MOBILE-OPTIMIZED: Charts - Stacked Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
                }}
                className="lg:col-span-2 bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Cosmic Earnings Trend</h3>
                  <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                    <Activity className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                    <span className="text-xs md:text-sm text-secondary">Live Analytics</span>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={220} className="md:!h-[300px]">
                  <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="adsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.ads} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={chartColors.ads} stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.social} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={chartColors.social} stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="sitesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.sites} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={chartColors.sites} stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6B7280"
                      fontSize={12}
                      fontWeight={500}
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      fontSize={11}
                      fontWeight={500}
                      axisLine={false}
                      tickLine={false}
                      width={35}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="ads" 
                      stackId="1"
                      stroke={chartColors.ads}
                      strokeWidth={3}
                      fill="url(#adsGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="social" 
                      stackId="1"
                      stroke={chartColors.social}
                      strokeWidth={3}
                      fill="url(#socialGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sites" 
                      stackId="1"
                      stroke={chartColors.sites}
                      strokeWidth={3}
                      fill="url(#sitesGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>

                {/* Enhanced Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 pt-4 border-t border-primary">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: chartColors.ads }}></div>
                    <span className="text-xs md:text-sm text-secondary font-medium">Ads Cosmos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: chartColors.social }}></div>
                    <span className="text-xs md:text-sm text-secondary font-medium">Social Cosmos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: chartColors.sites }}></div>
                    <span className="text-xs md:text-sm text-secondary font-medium">Site Cosmos</span>
                  </div>
                </div>
              </motion.div>

              {/* MOBILE-OPTIMIZED: Performance Breakdown - Card Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
                }}
                className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
              >
                <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">Cosmic Performance</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { name: 'Ads Cosmos', value: performanceMetrics.adsWatched, color: 'bg-soft-pink', icon: '📺', earnings: 304.50, chartColor: chartColors.ads },
                    { name: 'Social Cosmos', value: performanceMetrics.socialTasks, color: 'bg-pale-blue', icon: '❤️', earnings: 239.75, chartColor: chartColors.social },
                    { name: 'Site Cosmos', value: performanceMetrics.sitesVisited, color: 'bg-light-teal', icon: '🌐', earnings: 131.25, chartColor: chartColors.sites }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ 
                        scale: 1.02,
                        y: -2
                      }}
                      className="earnings-performer-row flex items-center justify-between p-3 md:p-4 rounded-lg cursor-pointer min-h-[64px]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                          <span className="text-[#2D2D2D] text-sm md:text-lg font-bold">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-primary text-sm md:text-base">{item.name}</span>
                          <div className="text-xs md:text-sm text-secondary">{item.value} completed</div>
                          <div className="w-12 md:w-16 h-1 rounded-full mt-1" style={{ backgroundColor: item.chartColor }}></div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-primary font-bold text-sm md:text-base">${item.earnings}</span>
                        <div className="text-xs text-secondary">Total earned</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'breakdown' && (
          <motion.div
            key="breakdown"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Enhanced Cosmic Daily Earnings Constellation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Enhanced Cosmic Background Environment */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {/* Dynamic Starfield Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
                  {[...Array(100)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        backgroundColor: i < 70 ? '#ffffff' : i < 85 ? '#60a5fa' : '#ec4899',
                        opacity: Math.random() * 0.8 + 0.2,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${1.5 + Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Enhanced Nebula Clouds with Better Colors */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-purple-400/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-cyan-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-gradient-radial from-pink-400/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.4s' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-emerald-400/15 via-emerald-500/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3.6s' }}></div>
                
                {/* Shooting Stars */}
                <div className="absolute top-1/4 left-0 w-2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-ping" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
                <div className="absolute top-3/4 right-0 w-3 h-0.5 bg-gradient-to-l from-transparent via-blue-300 to-transparent opacity-40 animate-ping" style={{ animationDelay: '5s', animationDuration: '6s' }}></div>
              </div>

              {/* Enhanced Main Content with Better Visibility */}
              <div className="relative z-10 bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 backdrop-blur-2xl rounded-3xl border-2 border-slate-500/30 shadow-2xl ring-1 ring-white/10">
                <div className="p-8 md:p-10">
                  {/* Enhanced Header */}
                  <div className="text-center mb-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center space-x-4 mb-6"
                    >
                      <div className="relative">
                        <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-ping opacity-30"></div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
                        Cosmic Weekly Journey
                      </h3>
                      <div className="relative">
                        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-slate-200 text-xl font-medium bg-gradient-to-r from-slate-200 to-slate-300 bg-clip-text text-transparent"
                    >
                      January 15-21, 2024 • Daily Universe Exploration
                    </motion.p>
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "120px", opacity: 1 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="mx-auto mt-4 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full shadow-lg"
                    ></motion.div>
                  </div>

                  {/* Enhanced Constellation Chart */}
                  <div className="relative h-96 md:h-[450px] mb-10 p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-2xl border border-slate-600/30 shadow-inner">
                    <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 800 350">
                      <defs>
                        {/* Enhanced Gradients for each universe */}
                        <radialGradient id="adsGlow" cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#FF1B8D" stopOpacity="0.9"/>
                          <stop offset="40%" stopColor="#EC4899" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1"/>
                        </radialGradient>
                        <radialGradient id="socialGlow" cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.9"/>
                          <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                        </radialGradient>
                        <radialGradient id="sitesGlow" cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#00E676" stopOpacity="0.9"/>
                          <stop offset="40%" stopColor="#10B981" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.1"/>
                        </radialGradient>
                        
                        {/* Enhanced Connection Lines */}
                        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                          <stop offset="25%" stopColor="#06B6D4" stopOpacity="0.8"/>
                          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.9"/>
                          <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.6"/>
                        </linearGradient>
                        
                        {/* Planet Surface Gradients */}
                        <radialGradient id="adsPlanet" cx="30%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#FFE4E1"/>
                          <stop offset="50%" stopColor="#FF69B4"/>
                          <stop offset="100%" stopColor="#DC143C"/>
                        </radialGradient>
                        <radialGradient id="socialPlanet" cx="30%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#E0F6FF"/>
                          <stop offset="50%" stopColor="#87CEEB"/>
                          <stop offset="100%" stopColor="#4682B4"/>
                        </radialGradient>
                        <radialGradient id="sitesPlanet" cx="30%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#F0FFF0"/>
                          <stop offset="50%" stopColor="#98FB98"/>
                          <stop offset="100%" stopColor="#228B22"/>
                        </radialGradient>
                        
                        {/* Enhanced Glow Effect */}
                        <filter id="enhancedGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Enhanced Connection Lines Between Days */}
                      {singleWeekData.map((day, index) => {
                        if (index === singleWeekData.length - 1) return null;
                        const x1 = 80 + (index * 100);
                        const y1 = 280 - (day.total * 1.4);
                        const x2 = 80 + ((index + 1) * 100);
                        const y2 = 280 - (singleWeekData[index + 1].total * 1.4);
                        
                        return (
                          <g key={`connection-group-${index}`}>
                            {/* Background glow line */}
                            <motion.line
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1.2, delay: 0.3 + index * 0.15 }}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="url(#connectionGrad)"
                              strokeWidth="6"
                              strokeOpacity="0.3"
                              filter="url(#enhancedGlow)"
                            />
                            {/* Main connection line */}
                            <motion.line
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="url(#connectionGrad)"
                              strokeWidth="3"
                              strokeDasharray="6 6"
                              strokeLinecap="round"
                            />
                            {/* Animated flowing effect */}
                            <motion.line
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ 
                                pathLength: [0, 1, 0], 
                                opacity: [0, 0.8, 0] 
                              }}
                              transition={{ 
                                duration: 2, 
                                delay: 1.5 + index * 0.3,
                                repeat: Infinity,
                                repeatDelay: 3
                              }}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        );
                      })}

                      {/* Enhanced Planet-like Day Nodes */}
                      {singleWeekData.map((day, index) => {
                        const x = 80 + (index * 100);
                        const baseY = 280 - (day.total * 1.4);
                        const maxRadius = 40;
                        const radius = Math.max(20, (day.total / 150) * maxRadius);
                        
                        return (
                          <g key={day.day}>
                            {/* Outer Glow Ring */}
                            <motion.circle
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.15 }}
                              cx={x}
                              cy={baseY}
                              r={radius + 15}
                              fill={day.topUniverse === 'Ads Cosmos' ? 'url(#adsGlow)' : 
                                    day.topUniverse === 'Social Cosmos' ? 'url(#socialGlow)' : 
                                    'url(#sitesGlow)'}
                              className="animate-pulse"
                              filter="url(#enhancedGlow)"
                            />
                            
                            {/* Planet Atmosphere */}
                            <motion.circle
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.6 }}
                              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                              cx={x}
                              cy={baseY}
                              r={radius + 8}
                              fill={day.topUniverse === 'Ads Cosmos' ? 'url(#adsGlow)' : 
                                    day.topUniverse === 'Social Cosmos' ? 'url(#socialGlow)' : 
                                    'url(#sitesGlow)'}
                              className="animate-pulse"
                              style={{ animationDelay: `${index * 0.2}s` }}
                            />
                            
                            {/* Main Planet Surface */}
                            <motion.circle
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.8, delay: 0.6 + index * 0.1, type: "spring", bounce: 0.3 }}
                              cx={x}
                              cy={baseY}
                              r={radius}
                              fill={day.topUniverse === 'Ads Cosmos' ? 'url(#adsPlanet)' : 
                                    day.topUniverse === 'Social Cosmos' ? 'url(#socialPlanet)' : 
                                    'url(#sitesPlanet)'}
                              className="cursor-pointer hover:brightness-125 transition-all duration-500"
                              filter="url(#enhancedGlow)"
                            />
                            
                            {/* Planet Highlight */}
                            <motion.circle
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.4 }}
                              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                              cx={x - radius * 0.3}
                              cy={baseY - radius * 0.3}
                              r={radius * 0.3}
                              fill="#ffffff"
                              className="opacity-30"
                            />
                            
                            {/* Multiple Planet Rings */}
                            <motion.ellipse
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 0.8 }}
                              transition={{ duration: 1.2, delay: 1 + index * 0.1 }}
                              cx={x}
                              cy={baseY}
                              rx={radius + 18}
                              ry="2"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeOpacity="0.6"
                            />
                            <motion.ellipse
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 0.6 }}
                              transition={{ duration: 1.4, delay: 1.2 + index * 0.1 }}
                              cx={x}
                              cy={baseY}
                              rx={radius + 25}
                              ry="1.5"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1"
                              strokeOpacity="0.4"
                            />
                            
                            {/* Orbiting Moons */}
                            <motion.circle
                              animate={{ 
                                rotate: 360
                              }}
                              transition={{ 
                                duration: 8 + index,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              style={{ originX: x, originY: baseY }}
                              cx={x + radius + 12}
                              cy={baseY}
                              r="2"
                              fill="#ffffff"
                              opacity="0.7"
                            />
                            
                            {/* Enhanced Day Label */}
                            <motion.text
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                              x={x}
                              y={baseY + radius + 35}
                              textAnchor="middle"
                              fill="#F1F5F9"
                              fontSize="14"
                              fontWeight="700"
                              textShadow="0 2px 4px rgba(0,0,0,0.5)"
                            >
                              {day.short}
                            </motion.text>
                            
                            {/* Enhanced Earnings Amount */}
                            <motion.text
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                              x={x}
                              y={baseY - radius - 20}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize="16"
                              fontWeight="900"
                              textShadow="0 2px 8px rgba(0,0,0,0.8)"
                            >
                              ${day.total}
                            </motion.text>
                            
                            {/* Efficiency Badge */}
                            <motion.rect
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                              x={x + radius - 8}
                              y={baseY - radius + 5}
                              width="16"
                              height="12"
                              rx="6"
                              fill={day.efficiency >= 95 ? "#10B981" : day.efficiency >= 90 ? "#F59E0B" : "#EF4444"}
                              opacity="0.9"
                            />
                            <motion.text
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                              x={x + radius}
                              y={baseY - radius + 14}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="8"
                              fontWeight="600"
                            >
                              {Math.round(day.efficiency)}
                            </motion.text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Enhanced Universe Legend */}
                  <div className="flex flex-wrap justify-center gap-8 mb-10">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="flex items-center space-x-3 bg-gradient-to-r from-pink-500/20 to-pink-600/10 px-4 py-3 rounded-xl border border-pink-400/30"
                    >
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 animate-pulse shadow-lg shadow-pink-500/50"></div>
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 animate-ping opacity-20"></div>
                      </div>
                      <span className="text-white font-bold text-lg">Ads Cosmos</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.4 }}
                      className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-blue-600/10 px-4 py-3 rounded-xl border border-blue-400/30"
                    >
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse shadow-lg shadow-blue-500/50"></div>
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-ping opacity-20"></div>
                      </div>
                      <span className="text-white font-bold text-lg">Social Cosmos</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.6 }}
                      className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 px-4 py-3 rounded-xl border border-emerald-400/30"
                    >
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-pulse shadow-lg shadow-emerald-500/50"></div>
                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-ping opacity-20"></div>
                      </div>
                      <span className="text-white font-bold text-lg">Site Cosmos</span>
                    </motion.div>
                  </div>

                  {/* Enhanced Daily Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {singleWeekData.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 2.8 + index * 0.15 }}
                        whileHover={{ 
                          scale: 1.08,
                          boxShadow: "0 20px 40px rgba(45, 58, 74, 0.3)",
                          rotateY: 5
                        }}
                        className="relative bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-lg rounded-2xl p-4 border-2 border-slate-600/40 transition-all duration-500 overflow-hidden"
                      >
                        {/* Card Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                        
                        {/* Top Universe Indicator */}
                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full animate-pulse"
                             style={{ 
                               backgroundColor: day.topUniverse === 'Ads Cosmos' ? '#EC4899' : 
                                              day.topUniverse === 'Social Cosmos' ? '#3B82F6' : '#10B981',
                               boxShadow: `0 0 8px ${day.topUniverse === 'Ads Cosmos' ? '#EC4899' : 
                                                    day.topUniverse === 'Social Cosmos' ? '#3B82F6' : '#10B981'}50`
                             }}></div>
                        
                        <div className="relative z-10 text-center">
                          <div className="text-sm font-bold text-white mb-1">{day.short}</div>
                          <div className="text-xs text-slate-300 mb-3">{day.date}</div>
                          <div className="text-xl font-extrabold text-transparent bg-gradient-to-r from-white to-slate-200 bg-clip-text mb-3">
                            ${day.total}
                          </div>
                          
                          {/* Enhanced Stats */}
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center text-slate-200">
                              <span className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                                <span>Tasks</span>
                              </span>
                              <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {day.tasks}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center text-slate-200">
                              <span className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                                <span>Efficiency</span>
                              </span>
                              <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                {day.efficiency}%
                              </span>
                            </div>
                            
                            {/* Performance Bar */}
                            <div className="mt-3">
                              <div className="w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(day.efficiency / 100) * 100}%` }}
                                  transition={{ duration: 1, delay: 3.2 + index * 0.1 }}
                                  className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full shadow-lg"
                                  style={{
                                    boxShadow: `0 0 10px ${day.efficiency >= 95 ? '#10B981' : day.efficiency >= 90 ? '#F59E0B' : '#EF4444'}50`
                                  }}
                                ></motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Detailed Earnings Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(45, 58, 74, 0.12)"
              }}
              className="bg-secondary rounded-xl p-4 md:p-6 border border-primary transition-all duration-300 shadow-primary"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-primary mb-2 sm:mb-0">Detailed Cosmic Earnings</h3>
                <div className="flex items-center space-x-2 bg-tertiary px-3 py-1 rounded-lg">
                  <Filter className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                  <span className="text-xs md:text-sm text-secondary">Filter & Sort</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary">
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Date</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Universe</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Tasks</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base">Amount</th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-primary text-sm md:text-base hidden sm:table-cell">Breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningsData.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.01,
                          y: -1
                        }}
                        className="table-row-base border-b border-secondary cursor-pointer"
                      >
                        <td className="py-3 px-2 md:px-4 text-primary font-medium text-sm md:text-base">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <span className="px-2 md:px-3 py-1 bg-soft-pink/20 text-primary rounded-full text-xs md:text-sm font-medium border border-soft-pink/20">
                            All Cosmos
                          </span>
                        </td>
                        <td className="py-3 px-2 md:px-4 text-primary font-medium text-sm md:text-base">{item.tasks}</td>
                        <td className="py-3 px-2 md:px-4 font-bold text-primary text-sm md:text-base">${item.amount}</td>
                        <td className="py-3 px-2 md:px-4 hidden sm:table-cell">
                          <div className="flex flex-wrap gap-1 md:gap-2 text-xs">
                            <span className="px-2 py-1 rounded text-white font-medium" style={{ backgroundColor: chartColors.ads }}>
                              Ads: ${item.ads}
                            </span>
                            <span className="px-2 py-1 rounded text-white font-medium" style={{ backgroundColor: chartColors.social }}>
                              Social: ${item.social}
                            </span>
                            <span className="px-2 py-1 rounded text-white font-medium" style={{ backgroundColor: chartColors.sites }}>
                              Sites: ${item.sites}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
        </div>
      </div>
  );
});

export default EarningsInterface;