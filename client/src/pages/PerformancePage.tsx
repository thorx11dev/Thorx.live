import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Settings } from 'lucide-react';
import PerformanceOptimizationPlan from '../performance/PerformanceOptimizationPlan';
import PerformanceSimulator from '../performance/PerformanceSimulator';

const PerformancePage = () => {
  const [activeView, setActiveView] = useState('plan');

  const views = [
    { id: 'plan', label: 'Optimization Plan', icon: Settings },
    { id: 'simulator', label: 'Performance Simulator', icon: BarChart3 }
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
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary">Thorx Performance Center</h1>
              <p className="text-secondary">100x performance optimization strategy and real-time simulation</p>
            </div>
          </div>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-4 mb-8"
        >
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                activeView === view.id
                  ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                  : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
              }`}
            >
              <view.icon className="w-5 h-5" />
              <span>{view.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'plan' && <PerformanceOptimizationPlan />}
          {activeView === 'simulator' && <PerformanceSimulator />}
        </motion.div>
      </div>
    </div>
  );
};

export default PerformancePage;