import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, TrendingUp, TrendingDown, Activity, Gauge, Server, Database, Globe, MemoryStick as Memory, Cpu, HardDrive } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface PerformanceMetric {
  timestamp: number;
  serverResponse: number;
  databaseQuery: number;
  bundleSize: number;
  memoryUsage: number;
  cacheHitRate: number;
  networkRequests: number;
}

const PerformanceSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [optimizationLevel, setOptimizationLevel] = useState(0);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    serverResponse: 2800,
    databaseQuery: 1200,
    bundleSize: 2.4,
    memoryUsage: 156,
    cacheHitRate: 23,
    networkRequests: 47
  });

  const optimizationStages = [
    {
      name: "Baseline",
      description: "Current performance without optimizations",
      multiplier: 1,
      color: "#ef4444"
    },
    {
      name: "Basic Caching",
      description: "Redis implementation and basic optimizations",
      multiplier: 0.6,
      color: "#f97316"
    },
    {
      name: "Database Optimization",
      description: "Indexes, connection pooling, query optimization",
      multiplier: 0.3,
      color: "#eab308"
    },
    {
      name: "Code Splitting",
      description: "Lazy loading and bundle optimization",
      multiplier: 0.15,
      color: "#22c55e"
    },
    {
      name: "Full Optimization",
      description: "All optimizations implemented",
      multiplier: 0.01,
      color: "#3b82f6"
    }
  ];

  const baselineMetrics = {
    serverResponse: 2800,
    databaseQuery: 1200,
    bundleSize: 2.4,
    memoryUsage: 156,
    cacheHitRate: 23,
    networkRequests: 47
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        const stage = optimizationStages[optimizationLevel];
        const timestamp = Date.now();
        
        // Calculate optimized metrics with some realistic variance
        const variance = () => 0.9 + Math.random() * 0.2; // ±10% variance
        
        const newMetrics = {
          serverResponse: Math.max(10, baselineMetrics.serverResponse * stage.multiplier * variance()),
          databaseQuery: Math.max(5, baselineMetrics.databaseQuery * stage.multiplier * variance()),
          bundleSize: Math.max(0.1, baselineMetrics.bundleSize * (stage.multiplier * 0.5 + 0.5) * variance()),
          memoryUsage: Math.max(10, baselineMetrics.memoryUsage * (stage.multiplier * 0.3 + 0.7) * variance()),
          cacheHitRate: Math.min(99, baselineMetrics.cacheHitRate + (100 - baselineMetrics.cacheHitRate) * (1 - stage.multiplier) * variance()),
          networkRequests: Math.max(3, baselineMetrics.networkRequests * (stage.multiplier * 0.2 + 0.8) * variance())
        };
        
        setCurrentMetrics(newMetrics);
        
        setMetrics(prev => {
          const newData = [...prev, {
            timestamp,
            ...newMetrics
          }].slice(-50); // Keep last 50 data points
          return newData;
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, optimizationLevel]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setOptimizationLevel(0);
    setMetrics([]);
    setCurrentMetrics(baselineMetrics);
  };

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case 'time':
        return `${Math.round(value)}ms`;
      case 'size':
        return `${value.toFixed(1)}MB`;
      case 'percentage':
        return `${Math.round(value)}%`;
      case 'count':
        return Math.round(value).toString();
      default:
        return value.toString();
    }
  };

  const getImprovementPercentage = (current: number, baseline: number) => {
    return Math.round(((baseline - current) / baseline) * 100);
  };

  const metricCards = [
    {
      title: "Server Response",
      icon: Server,
      value: currentMetrics.serverResponse,
      baseline: baselineMetrics.serverResponse,
      type: 'time',
      color: 'bg-red-500'
    },
    {
      title: "Database Query",
      icon: Database,
      value: currentMetrics.databaseQuery,
      baseline: baselineMetrics.databaseQuery,
      type: 'time',
      color: 'bg-orange-500'
    },
    {
      title: "Bundle Size",
      icon: Globe,
      value: currentMetrics.bundleSize,
      baseline: baselineMetrics.bundleSize,
      type: 'size',
      color: 'bg-yellow-500'
    },
    {
      title: "Memory Usage",
      icon: Memory,
      value: currentMetrics.memoryUsage,
      baseline: baselineMetrics.memoryUsage,
      type: 'size',
      color: 'bg-green-500'
    },
    {
      title: "Cache Hit Rate",
      icon: HardDrive,
      value: currentMetrics.cacheHitRate,
      baseline: baselineMetrics.cacheHitRate,
      type: 'percentage',
      color: 'bg-blue-500'
    },
    {
      title: "Network Requests",
      icon: Activity,
      value: currentMetrics.networkRequests,
      baseline: baselineMetrics.networkRequests,
      type: 'count',
      color: 'bg-purple-500'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-2 border-gray-200 rounded-lg p-3 shadow-lg"
        >
          <p className="text-gray-800 font-semibold mb-2">Performance Metrics</p>
          <div className="space-y-1">
            <p className="text-gray-700 text-sm">Server: {Math.round(data.serverResponse)}ms</p>
            <p className="text-gray-700 text-sm">Database: {Math.round(data.databaseQuery)}ms</p>
            <p className="text-gray-700 text-sm">Bundle: {data.bundleSize.toFixed(1)}MB</p>
            <p className="text-gray-700 text-sm">Memory: {Math.round(data.memoryUsage)}MB</p>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Simulator Controls */}
      <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-primary">Performance Optimization Simulator</h3>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRunning ? handlePause : handleStart}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isRunning 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
          </div>
        </div>

        {/* Optimization Level Selector */}
        <div className="mb-6">
          <h4 className="font-medium text-primary mb-3">Optimization Level</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {optimizationStages.map((stage, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOptimizationLevel(index)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  optimizationLevel === index
                    ? 'border-soft-pink bg-soft-pink/20 text-primary'
                    : 'border-primary bg-tertiary text-secondary hover:bg-secondary'
                }`}
              >
                <div className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: stage.color }}
                  />
                  <div className="font-medium text-sm">{stage.name}</div>
                  <div className="text-xs text-secondary mt-1">{stage.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Current Stage Info */}
        <div className="p-4 bg-tertiary rounded-lg border border-primary">
          <div className="flex items-center space-x-3">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: optimizationStages[optimizationLevel].color }}
            />
            <div>
              <div className="font-medium text-primary">
                Current Stage: {optimizationStages[optimizationLevel].name}
              </div>
              <div className="text-sm text-secondary">
                {optimizationStages[optimizationLevel].description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-secondary rounded-xl p-6 border border-primary shadow-primary"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.color} text-white`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <div className="text-right">
                {getImprovementPercentage(metric.value, metric.baseline) > 0 ? (
                  <div className="flex items-center text-green-600">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">
                      -{getImprovementPercentage(metric.value, metric.baseline)}%
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <Activity className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Baseline</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-2xl font-bold text-primary mb-1">
              {formatValue(metric.value, metric.type)}
            </div>
            <div className="text-sm text-secondary mb-3">{metric.title}</div>
            
            <div className="text-xs text-tertiary">
              Baseline: {formatValue(metric.baseline, metric.type)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Response Time Chart */}
        <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
          <h4 className="font-semibold text-primary mb-4">Response Time Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="serverResponse" 
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Server Response"
              />
              <Line 
                type="monotone" 
                dataKey="databaseQuery" 
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                name="Database Query"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Usage Chart */}
        <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
          <h4 className="font-semibold text-primary mb-4">Resource Usage Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metrics}>
              <defs>
                <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#6B7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="memoryUsage" 
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#memoryGradient)"
                name="Memory Usage"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
        <h4 className="font-semibold text-primary mb-4">Optimization Impact Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-tertiary rounded-lg border border-primary">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {getImprovementPercentage(currentMetrics.serverResponse, baselineMetrics.serverResponse)}%
            </div>
            <div className="text-sm text-secondary">Server Response Improvement</div>
          </div>
          <div className="text-center p-4 bg-tertiary rounded-lg border border-primary">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {getImprovementPercentage(currentMetrics.bundleSize, baselineMetrics.bundleSize)}%
            </div>
            <div className="text-sm text-secondary">Bundle Size Reduction</div>
          </div>
          <div className="text-center p-4 bg-tertiary rounded-lg border border-primary">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {Math.round(currentMetrics.cacheHitRate)}%
            </div>
            <div className="text-sm text-secondary">Cache Hit Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSimulator;