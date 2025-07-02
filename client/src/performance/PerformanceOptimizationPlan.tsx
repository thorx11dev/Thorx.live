import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Database, Server, Globe, Code, MemoryStick as Memory, Network, Target, TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, Settings, Layers, Cpu, HardDrive, Wifi, Image, FileText, Gauge, Activity, Shield, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

const PerformanceOptimizationPlan = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Current Performance Metrics (Baseline)
  const currentMetrics = {
    serverResponseTime: 2800, // ms
    databaseQueryTime: 1200, // ms
    firstContentfulPaint: 3200, // ms
    largestContentfulPaint: 4800, // ms
    timeToInteractive: 5600, // ms
    cumulativeLayoutShift: 0.15,
    bundleSize: 2.4, // MB
    networkRequests: 47,
    cacheHitRate: 23, // %
    memoryUsage: 156, // MB
    cpuUtilization: 78 // %
  };

  // Target Performance Metrics (100x improvement)
  const targetMetrics = {
    serverResponseTime: 28, // ms (100x faster)
    databaseQueryTime: 12, // ms (100x faster)
    firstContentfulPaint: 320, // ms (10x faster - realistic for FCP)
    largestContentfulPaint: 480, // ms (10x faster - realistic for LCP)
    timeToInteractive: 560, // ms (10x faster - realistic for TTI)
    cumulativeLayoutShift: 0.001, // 150x better
    bundleSize: 0.24, // MB (10x smaller)
    networkRequests: 5, // 9.4x fewer
    cacheHitRate: 98, // % (4.3x better)
    memoryUsage: 15.6, // MB (10x less)
    cpuUtilization: 8 // % (9.75x less)
  };

  const optimizationAreas = [
    {
      id: 'server',
      title: 'Server Response Time',
      icon: Server,
      color: 'bg-red-500',
      current: currentMetrics.serverResponseTime,
      target: targetMetrics.serverResponseTime,
      unit: 'ms',
      priority: 'Critical',
      impact: '100x faster server responses'
    },
    {
      id: 'database',
      title: 'Database Optimization',
      icon: Database,
      color: 'bg-orange-500',
      current: currentMetrics.databaseQueryTime,
      target: targetMetrics.databaseQueryTime,
      unit: 'ms',
      priority: 'Critical',
      impact: '100x faster queries'
    },
    {
      id: 'caching',
      title: 'Caching Implementation',
      icon: HardDrive,
      color: 'bg-yellow-500',
      current: currentMetrics.cacheHitRate,
      target: targetMetrics.cacheHitRate,
      unit: '%',
      priority: 'High',
      impact: '4.3x better cache efficiency'
    },
    {
      id: 'code-splitting',
      title: 'Code Splitting & Lazy Loading',
      icon: Code,
      color: 'bg-green-500',
      current: currentMetrics.bundleSize,
      target: targetMetrics.bundleSize,
      unit: 'MB',
      priority: 'High',
      impact: '10x smaller initial bundle'
    },
    {
      id: 'assets',
      title: 'Asset Delivery Optimization',
      icon: Globe,
      color: 'bg-blue-500',
      current: currentMetrics.networkRequests,
      target: targetMetrics.networkRequests,
      unit: 'requests',
      priority: 'Medium',
      impact: '9.4x fewer network requests'
    },
    {
      id: 'memory',
      title: 'Memory Management',
      icon: Memory,
      color: 'bg-purple-500',
      current: currentMetrics.memoryUsage,
      target: targetMetrics.memoryUsage,
      unit: 'MB',
      priority: 'Medium',
      impact: '10x less memory usage'
    },
    {
      id: 'network',
      title: 'Network Request Reduction',
      icon: Network,
      color: 'bg-pink-500',
      current: currentMetrics.cpuUtilization,
      target: targetMetrics.cpuUtilization,
      unit: '%',
      priority: 'Low',
      impact: '9.75x less CPU usage'
    }
  ];

  const detailedOptimizations = {
    server: {
      title: "Server Response Time Optimization",
      currentIssues: [
        "Synchronous database operations blocking response",
        "No connection pooling implementation",
        "Inefficient middleware stack",
        "Lack of response compression",
        "No HTTP/2 implementation"
      ],
      solutions: [
        {
          technique: "Async/Await Database Operations",
          implementation: "Convert all database calls to async operations with connection pooling",
          expectedImprovement: "60x faster",
          resources: "2 backend developers, 1 week",
          risks: "Potential race conditions in concurrent operations"
        },
        {
          technique: "Redis Caching Layer",
          implementation: "Implement Redis for session storage and frequent queries",
          expectedImprovement: "25x faster",
          resources: "1 DevOps engineer, 3 days",
          risks: "Cache invalidation complexity"
        },
        {
          technique: "CDN Implementation",
          implementation: "Deploy Cloudflare CDN with edge computing",
          expectedImprovement: "15x faster",
          resources: "1 DevOps engineer, 2 days",
          risks: "Initial configuration complexity"
        }
      ]
    },
    database: {
      title: "Database Query Optimization",
      currentIssues: [
        "N+1 query problems in ORM",
        "Missing database indexes",
        "Inefficient JOIN operations",
        "No query result caching",
        "Blocking transactions"
      ],
      solutions: [
        {
          technique: "Query Optimization & Indexing",
          implementation: "Add composite indexes and optimize JOIN queries",
          expectedImprovement: "50x faster",
          resources: "1 database specialist, 1 week",
          risks: "Index maintenance overhead"
        },
        {
          technique: "Connection Pooling",
          implementation: "Implement pgBouncer for PostgreSQL connection pooling",
          expectedImprovement: "30x faster",
          resources: "1 backend developer, 2 days",
          risks: "Connection limit management"
        },
        {
          technique: "Read Replicas",
          implementation: "Setup read replicas for analytics queries",
          expectedImprovement: "20x faster",
          resources: "1 DevOps engineer, 3 days",
          risks: "Data consistency lag"
        }
      ]
    },
    caching: {
      title: "Comprehensive Caching Strategy",
      currentIssues: [
        "No browser caching headers",
        "Missing service worker implementation",
        "No API response caching",
        "Inefficient static asset caching",
        "No database query caching"
      ],
      solutions: [
        {
          technique: "Multi-Layer Caching",
          implementation: "Browser cache + Service Worker + Redis + Database query cache",
          expectedImprovement: "4x better hit rate",
          resources: "2 frontend developers, 1 backend developer, 1 week",
          risks: "Cache invalidation complexity"
        },
        {
          technique: "Intelligent Cache Warming",
          implementation: "Pre-populate cache with frequently accessed data",
          expectedImprovement: "2x better performance",
          resources: "1 backend developer, 3 days",
          risks: "Cache memory usage"
        }
      ]
    },
    'code-splitting': {
      title: "Advanced Code Splitting & Lazy Loading",
      currentIssues: [
        "Monolithic bundle loading",
        "No route-based code splitting",
        "Heavy third-party libraries loaded upfront",
        "No component-level lazy loading",
        "Inefficient tree shaking"
      ],
      solutions: [
        {
          technique: "Route-Based Code Splitting",
          implementation: "Split each page into separate chunks with React.lazy()",
          expectedImprovement: "5x smaller initial bundle",
          resources: "2 frontend developers, 4 days",
          risks: "Loading state management complexity"
        },
        {
          technique: "Component-Level Lazy Loading",
          implementation: "Lazy load heavy components like charts and 3D elements",
          expectedImprovement: "3x faster initial load",
          resources: "2 frontend developers, 3 days",
          risks: "User experience during loading"
        },
        {
          technique: "Dynamic Imports for Libraries",
          implementation: "Load chart libraries and 3D components only when needed",
          expectedImprovement: "2x smaller bundle",
          resources: "1 frontend developer, 2 days",
          risks: "Runtime loading errors"
        }
      ]
    },
    assets: {
      title: "Asset Delivery Optimization",
      currentIssues: [
        "Unoptimized image formats",
        "No image lazy loading",
        "Multiple font file requests",
        "Inefficient CSS delivery",
        "No resource preloading"
      ],
      solutions: [
        {
          technique: "Next-Gen Image Formats",
          implementation: "Convert to WebP/AVIF with fallbacks",
          expectedImprovement: "70% smaller images",
          resources: "1 frontend developer, 2 days",
          risks: "Browser compatibility"
        },
        {
          technique: "Resource Bundling",
          implementation: "Combine CSS files and implement critical CSS inlining",
          expectedImprovement: "5x fewer requests",
          resources: "1 frontend developer, 3 days",
          risks: "Cache invalidation strategy"
        },
        {
          technique: "Preloading Strategy",
          implementation: "Implement intelligent resource preloading",
          expectedImprovement: "2x faster perceived performance",
          resources: "1 frontend developer, 2 days",
          risks: "Bandwidth usage on mobile"
        }
      ]
    },
    memory: {
      title: "Memory Management Optimization",
      currentIssues: [
        "Memory leaks in React components",
        "Inefficient state management",
        "Large object retention",
        "No garbage collection optimization",
        "Heavy animation objects"
      ],
      solutions: [
        {
          technique: "React Memory Optimization",
          implementation: "Implement proper cleanup in useEffect and optimize re-renders",
          expectedImprovement: "5x less memory usage",
          resources: "2 frontend developers, 1 week",
          risks: "Component functionality changes"
        },
        {
          technique: "State Management Optimization",
          implementation: "Optimize Redux/Context state structure and implement memoization",
          expectedImprovement: "3x less memory usage",
          resources: "1 frontend developer, 3 days",
          risks: "State synchronization issues"
        },
        {
          technique: "Animation Optimization",
          implementation: "Use CSS transforms and optimize Framer Motion usage",
          expectedImprovement: "2x less memory usage",
          resources: "1 frontend developer, 2 days",
          risks: "Animation quality trade-offs"
        }
      ]
    },
    network: {
      title: "Network Request Reduction",
      currentIssues: [
        "Multiple API calls for single operations",
        "No request batching",
        "Inefficient polling mechanisms",
        "No request deduplication",
        "Large payload sizes"
      ],
      solutions: [
        {
          technique: "GraphQL Implementation",
          implementation: "Replace REST with GraphQL for efficient data fetching",
          expectedImprovement: "10x fewer requests",
          resources: "2 backend developers, 2 weeks",
          risks: "Learning curve and migration complexity"
        },
        {
          technique: "Request Batching",
          implementation: "Batch multiple API calls into single requests",
          expectedImprovement: "5x fewer requests",
          resources: "1 backend developer, 1 week",
          risks: "Error handling complexity"
        },
        {
          technique: "WebSocket Implementation",
          implementation: "Use WebSockets for real-time data instead of polling",
          expectedImprovement: "20x fewer requests",
          resources: "1 backend developer, 1 frontend developer, 1 week",
          risks: "Connection management complexity"
        }
      ]
    }
  };

  const implementationTimeline = [
    {
      phase: "Phase 1: Critical Infrastructure",
      duration: "2 weeks",
      priority: "Critical",
      tasks: [
        "Implement Redis caching layer",
        "Setup database connection pooling",
        "Add critical database indexes",
        "Implement CDN deployment"
      ],
      expectedImprovement: "40x performance boost",
      resources: "3 developers, 1 DevOps engineer"
    },
    {
      phase: "Phase 2: Code Optimization",
      duration: "2 weeks", 
      priority: "High",
      tasks: [
        "Implement route-based code splitting",
        "Add component lazy loading",
        "Optimize React memory usage",
        "Setup service worker caching"
      ],
      expectedImprovement: "20x additional improvement",
      resources: "3 frontend developers"
    },
    {
      phase: "Phase 3: Advanced Optimizations",
      duration: "2 weeks",
      priority: "Medium",
      tasks: [
        "Implement GraphQL",
        "Add WebSocket connections",
        "Optimize asset delivery",
        "Fine-tune caching strategies"
      ],
      expectedImprovement: "10x additional improvement",
      resources: "2 backend developers, 2 frontend developers"
    },
    {
      phase: "Phase 4: Performance Monitoring",
      duration: "1 week",
      priority: "Low",
      tasks: [
        "Setup performance monitoring",
        "Implement automated testing",
        "Create performance dashboards",
        "Document optimization strategies"
      ],
      expectedImprovement: "Maintain 100x improvement",
      resources: "1 DevOps engineer, 1 frontend developer"
    }
  ];

  const riskMitigation = [
    {
      risk: "Cache Invalidation Complexity",
      probability: "High",
      impact: "Medium",
      mitigation: "Implement versioned cache keys and automated invalidation triggers",
      fallback: "Manual cache clearing procedures and monitoring"
    },
    {
      risk: "Database Migration Issues",
      probability: "Medium", 
      impact: "High",
      mitigation: "Staged rollout with rollback procedures and comprehensive testing",
      fallback: "Immediate rollback to previous database configuration"
    },
    {
      risk: "Code Splitting Loading Errors",
      probability: "Medium",
      impact: "Medium", 
      mitigation: "Implement error boundaries and fallback loading mechanisms",
      fallback: "Graceful degradation to full bundle loading"
    },
    {
      risk: "Memory Optimization Breaking Animations",
      probability: "Low",
      impact: "High",
      mitigation: "Extensive testing and gradual optimization implementation",
      fallback: "Revert to previous animation implementation"
    }
  ];

  const sections = [
    { id: 'overview', label: 'Performance Overview', icon: Gauge },
    { id: 'server', label: 'Server Optimization', icon: Server },
    { id: 'database', label: 'Database Optimization', icon: Database },
    { id: 'caching', label: 'Caching Strategy', icon: HardDrive },
    { id: 'code-splitting', label: 'Code Splitting', icon: Code },
    { id: 'assets', label: 'Asset Optimization', icon: Globe },
    { id: 'memory', label: 'Memory Management', icon: Memory },
    { id: 'network', label: 'Network Optimization', icon: Network },
    { id: 'timeline', label: 'Implementation Timeline', icon: Clock },
    { id: 'risks', label: 'Risk Management', icon: Shield }
  ];

  const calculateImprovement = (current: number, target: number) => {
    return Math.round((current / target) * 10) / 10;
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement >= 50) return 'text-red-600';
    if (improvement >= 20) return 'text-orange-600';
    if (improvement >= 10) return 'text-yellow-600';
    if (improvement >= 5) return 'text-green-600';
    return 'text-blue-600';
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
          <h1 className="text-4xl font-bold text-primary mb-2">Thorx 100x Performance Optimization Plan</h1>
          <p className="text-secondary">Comprehensive strategy to achieve 100x performance improvement while maintaining all animations and UI elements</p>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 border ${
                activeSection === section.id
                  ? 'bg-soft-pink/20 text-primary border-soft-pink/30 shadow-lg'
                  : 'text-secondary hover:bg-tertiary hover:text-primary border-primary'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Performance Metrics Overview */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Performance Metrics Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {optimizationAreas.map((area, index) => (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-tertiary rounded-lg border border-primary"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${area.color} text-white`}>
                        <area.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">{area.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          area.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                          area.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                          area.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {area.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Current:</span>
                        <span className="font-medium text-red-600">{area.current}{area.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Target:</span>
                        <span className="font-medium text-green-600">{area.target}{area.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary">Improvement:</span>
                        <span className={`font-bold ${getImprovementColor(calculateImprovement(area.current, area.target))}`}>
                          {calculateImprovement(area.current, area.target)}x
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-primary">
                      <p className="text-xs text-secondary">{area.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Overall Performance Goals */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Overall Performance Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-tertiary rounded-lg border border-primary">
                  <div className="text-3xl font-bold text-green-600 mb-2">100x</div>
                  <div className="text-sm text-secondary">Server Response Time Improvement</div>
                </div>
                <div className="text-center p-6 bg-tertiary rounded-lg border border-primary">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10x</div>
                  <div className="text-sm text-secondary">Frontend Loading Speed</div>
                </div>
                <div className="text-center p-6 bg-tertiary rounded-lg border border-primary">
                  <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
                  <div className="text-sm text-secondary">Resource Usage Reduction</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Individual Optimization Sections */}
        {Object.keys(detailedOptimizations).includes(activeSection) && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">
                {detailedOptimizations[activeSection as keyof typeof detailedOptimizations].title}
              </h3>
              
              {/* Current Issues */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary mb-4">Current Performance Issues</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailedOptimizations[activeSection as keyof typeof detailedOptimizations].currentIssues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="font-semibold text-primary mb-4">Optimization Solutions</h4>
                <div className="space-y-6">
                  {detailedOptimizations[activeSection as keyof typeof detailedOptimizations].solutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-primary rounded-lg overflow-hidden"
                    >
                      <div className="bg-tertiary p-4 border-b border-primary">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-primary">{solution.technique}</h5>
                          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                            {solution.expectedImprovement}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h6 className="font-medium text-primary mb-2">Implementation:</h6>
                            <p className="text-sm text-secondary mb-4">{solution.implementation}</p>
                            
                            <h6 className="font-medium text-primary mb-2">Resources Required:</h6>
                            <p className="text-sm text-secondary">{solution.resources}</p>
                          </div>
                          
                          <div>
                            <h6 className="font-medium text-primary mb-2">Potential Risks:</h6>
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                              <p className="text-sm text-secondary">{solution.risks}</p>
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
        )}

        {/* Implementation Timeline */}
        {activeSection === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Implementation Timeline</h3>
              <div className="space-y-6">
                {implementationTimeline.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-primary rounded-lg overflow-hidden"
                  >
                    <div className="bg-tertiary p-4 border-b border-primary">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-primary">{phase.phase}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-secondary">Duration: {phase.duration}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              phase.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                              phase.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                              phase.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {phase.priority}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{phase.expectedImprovement}</div>
                          <div className="text-sm text-secondary">{phase.resources}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h5 className="font-medium text-primary mb-3">Tasks:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-secondary">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resource Allocation */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Resource Allocation Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-tertiary rounded-lg border border-primary">
                  <div className="text-2xl font-bold text-blue-600 mb-2">7 weeks</div>
                  <div className="text-sm text-secondary">Total Implementation Time</div>
                </div>
                <div className="text-center p-6 bg-tertiary rounded-lg border border-primary">
                  <div className="text-2xl font-bold text-purple-600 mb-2">8 developers</div>
                  <div className="text-sm text-secondary">Peak Team Size Required</div>
                </div>
                <div className="text-center p-6 bg-tertiary rounded-lg border border-primary">
                  <div className="text-2xl font-bold text-green-600 mb-2">$150K</div>
                  <div className="text-sm text-secondary">Estimated Implementation Cost</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Risk Management */}
        {activeSection === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Risk Assessment & Mitigation</h3>
              <div className="space-y-6">
                {riskMitigation.map((risk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-primary rounded-lg overflow-hidden"
                  >
                    <div className="bg-tertiary p-4 border-b border-primary">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-primary">{risk.risk}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            risk.probability === 'High' ? 'bg-red-100 text-red-800' :
                            risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.probability} Probability
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            risk.impact === 'High' ? 'bg-red-100 text-red-800' :
                            risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {risk.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-primary mb-2">Mitigation Strategy:</h5>
                          <p className="text-sm text-secondary">{risk.mitigation}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-primary mb-2">Fallback Plan:</h5>
                          <p className="text-sm text-secondary">{risk.fallback}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Success Metrics */}
            <div className="bg-secondary rounded-xl p-6 border border-primary shadow-primary">
              <h3 className="text-xl font-bold text-primary mb-6">Success Metrics & Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-primary mb-3">Key Performance Indicators</h4>
                  <div className="space-y-2">
                    {[
                      'Server response time < 50ms',
                      'First Contentful Paint < 500ms',
                      'Time to Interactive < 1000ms',
                      'Bundle size < 500KB',
                      'Cache hit rate > 95%',
                      'Memory usage < 20MB'
                    ].map((kpi, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-secondary">{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-3">Monitoring Tools</h4>
                  <div className="space-y-2">
                    {[
                      'Real User Monitoring (RUM)',
                      'Synthetic performance testing',
                      'Server performance dashboards',
                      'Database query monitoring',
                      'Memory usage tracking',
                      'Network request analysis'
                    ].map((tool, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-secondary">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PerformanceOptimizationPlan;