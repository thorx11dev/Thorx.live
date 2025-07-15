import React, { useState, useEffect, memo, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Star, 
  Clock, 
  DollarSign, 
  Target,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Zap,
  TrendingUp,
  BarChart3,
  Eye,
  Calendar,
  Activity,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  Users,
  Award,
  Briefcase,
  Globe,
  Shield,
  Timer,
  ExternalLink,
  Heart,
  MessageCircle,
  Share,
  ThumbsUp,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Loader,
  MousePointer,
  Monitor,
  Smartphone
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAdvancedPerformance } from '../hooks/useAdvancedPerformance';
import { useTeamAuth } from '@/hooks/useTeamAuth';
import TeamSidebar from '@/components/TeamSidebar';

const PerformanceOptimizer = React.lazy(() => import('../performance/PerformanceOptimizer'));

const WorkPage = memo(() => {
  const { enableGPUAcceleration } = useAdvancedPerformance();
  const { teamMember, isLoading } = useTeamAuth();
  const [activeSection, setActiveSection] = useState('ads');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);
  const [siteVisitTimer, setSiteVisitTimer] = useState<{[key: number]: number}>({});
  const [completedSites, setCompletedSites] = useState<number[]>([]);
  const [socialTaskProgress, setSocialTaskProgress] = useState<{[key: number]: number}>({});

  // Enable GPU acceleration on mount
  useEffect(() => {
    enableGPUAcceleration();
  }, [enableGPUAcceleration]);

  // IMPROVED: High-contrast colors for better visibility
  const chartColors = {
    ads: '#E91E63',      // Material Pink - 4.52:1 contrast
    social: '#2196F3',   // Material Blue - 4.59:1 contrast
    sites: '#009688',    // Material Teal - 4.54:1 contrast
    total: '#9C27B0'     // Material Purple - 4.61:1 contrast
  };

  // Enhanced analytics data
  const earningsData = [
    { day: 'Mon', ads: 45.50, social: 28.75, sites: 15.25, total: 89.50 },
    { day: 'Tue', ads: 52.75, social: 32.50, sites: 18.75, total: 104.00 },
    { day: 'Wed', ads: 38.25, social: 35.75, sites: 22.50, total: 96.50 },
    { day: 'Thu', ads: 61.50, social: 29.25, sites: 16.75, total: 107.50 },
    { day: 'Fri', ads: 48.75, social: 41.50, sites: 19.25, total: 109.50 },
    { day: 'Sat', ads: 55.25, social: 38.75, sites: 21.00, total: 115.00 },
    { day: 'Sun', ads: 42.50, social: 33.25, sites: 17.75, total: 93.50 }
  ];

  const categoryData = [
    { name: 'Ads Cosmos', value: 40, color: chartColors.ads, earnings: 304.50 },
    { name: 'Social Cosmos', value: 35, color: chartColors.social, earnings: 239.75 },
    { name: 'Site Cosmos', value: 25, color: chartColors.sites, earnings: 131.25 }
  ];

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

  // Video ads data
  const videoAds = [
    {
      id: 1,
      title: "Premium Fitness App Demo",
      duration: 30,
      reward: 3.50,
      category: "Health & Fitness",
      thumbnail: "🏃‍♂️",
      description: "Discover the latest fitness tracking features",
      status: "available",
      completions: 1247
    },
    {
      id: 2,
      title: "E-commerce Platform Tour",
      duration: 45,
      reward: 5.25,
      category: "Shopping",
      thumbnail: "🛒",
      description: "Explore new shopping experiences",
      status: "available",
      completions: 856
    },
    {
      id: 3,
      title: "Financial Planning Tool",
      duration: 60,
      reward: 7.50,
      category: "Finance",
      thumbnail: "💰",
      description: "Learn about smart investment strategies",
      status: "featured",
      completions: 423
    }
  ];

  // Social media tasks
  const socialTasks = [
    {
      id: 1,
      platform: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      task: "Like and Follow Fashion Brand",
      description: "Follow @fashionbrand and like their latest 3 posts",
      reward: 2.75,
      duration: "2 mins",
      status: "available",
      requirements: ["Follow account", "Like 3 recent posts", "Stay followed for 24h"],
      completions: 892
    },
    {
      id: 2,
      platform: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      task: "Share Business Page Post",
      description: "Share a post from a local business page",
      reward: 3.25,
      duration: "3 mins",
      status: "available",
      requirements: ["Like business page", "Share specific post", "Keep share for 48h"],
      completions: 654
    },
    {
      id: 3,
      platform: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      task: "Retweet and Comment",
      description: "Retweet with thoughtful comment on tech news",
      reward: 4.50,
      duration: "5 mins",
      status: "in-progress",
      requirements: ["Follow account", "Retweet with comment", "Engage authentically"],
      completions: 423
    },
    {
      id: 4,
      platform: "YouTube",
      icon: Youtube,
      color: "bg-red-600",
      task: "Subscribe and Watch",
      description: "Subscribe to channel and watch full video",
      reward: 6.75,
      duration: "8 mins",
      status: "available",
      requirements: ["Subscribe to channel", "Watch full video", "Like video"],
      completions: 789
    }
  ];

  // Site visit tasks (PTV)
  const siteVisitTasks = [
    {
      id: 1,
      title: "Tech News Portal",
      url: "technews.example.com",
      description: "Visit and browse technology news website",
      reward: 1.25,
      visitDuration: 45,
      status: "available",
      safetyRating: 5,
      category: "News & Media",
      completions: 1456,
      requirements: ["Stay on site for 45 seconds", "Browse at least 2 pages", "No ad blockers"]
    },
    {
      id: 2,
      title: "Online Learning Platform",
      url: "edulearn.example.com",
      description: "Explore online course offerings",
      reward: 2.50,
      visitDuration: 60,
      status: "available",
      safetyRating: 5,
      category: "Education",
      completions: 987,
      requirements: ["Stay on site for 60 seconds", "View course catalog", "Register interest"]
    },
    {
      id: 3,
      title: "E-commerce Store",
      url: "shop.example.com",
      description: "Browse product categories and deals",
      reward: 1.75,
      visitDuration: 30,
      status: "completed",
      safetyRating: 4,
      category: "Shopping",
      completions: 2134,
      requirements: ["Stay on site for 30 seconds", "Browse products", "Add item to cart"]
    },
    {
      id: 4,
      title: "Health & Wellness Blog",
      url: "wellness.example.com",
      description: "Read health tips and wellness articles",
      reward: 3.00,
      visitDuration: 90,
      status: "available",
      safetyRating: 5,
      category: "Health",
      completions: 756,
      requirements: ["Stay on site for 90 seconds", "Read full article", "Share on social media"]
    }
  ];

  // Video simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying && currentVideoId) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsVideoPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, currentVideoId]);

  // Site visit timer simulation
  useEffect(() => {
    const intervals: {[key: number]: NodeJS.Timeout} = {};
    
    Object.keys(siteVisitTimer).forEach(siteId => {
      const id = parseInt(siteId);
      if (siteVisitTimer[id] > 0 && !completedSites.includes(id)) {
        intervals[id] = setInterval(() => {
          setSiteVisitTimer(prev => {
            const newTime = prev[id] - 1;
            if (newTime <= 0) {
              setCompletedSites(prevCompleted => [...prevCompleted, id]);
              return { ...prev, [id]: 0 };
            }
            return { ...prev, [id]: newTime };
          });
        }, 1000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [siteVisitTimer, completedSites]);

  const handleVideoPlay = (videoId: number) => {
    setCurrentVideoId(videoId);
    setIsVideoPlaying(true);
    setVideoProgress(0);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoReset = () => {
    setVideoProgress(0);
    setIsVideoPlaying(false);
  };

  const handleSiteVisit = (siteId: number, duration: number) => {
    setSiteVisitTimer(prev => ({ ...prev, [siteId]: duration }));
  };

  const handleSocialTaskStart = (taskId: number) => {
    setSocialTaskProgress(prev => ({ ...prev, [taskId]: 0 }));
    // Simulate progress
    const interval = setInterval(() => {
      setSocialTaskProgress(prev => {
        const currentProgress = prev[taskId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [taskId]: currentProgress + 10 };
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-50 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'featured': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getSafetyStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Enhanced tooltip components with better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 border-2 border-slate-600 rounded-lg p-4 shadow-lg"
        >
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white font-medium">
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
          className="bg-slate-800 border-2 border-slate-600 rounded-lg p-3 shadow-lg"
        >
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-white font-medium">{`${payload[0].value}% - $${payload[0].payload.earnings}`}</p>
        </motion.div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <div className="w-64 bg-slate-800 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!teamMember) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <div className="w-64 bg-slate-800 flex items-center justify-center">
          <div className="text-slate-400">No access</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-lg mb-4">Authentication required</p>
            <p className="text-slate-400">Please log in to access the workspace</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <TeamSidebar />
      <div className="flex-1">
        <Suspense fallback={<div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-slate-900 flex items-center justify-center">
          <div className="text-white text-xl font-semibold">Initializing workspace...</div>
        </div>}>
          <PerformanceOptimizer />
          <div className="min-h-screen pt-4 px-4 sm:px-6 lg:px-8 bg-slate-900 thorx-performance-optimized">
            <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">Cosmic Workplace</h1>
              <p className="text-slate-300">Welcome {teamMember?.name} - Your earning universe awaits</p>
            </motion.div>

            {/* Performance Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
            >
              {[
                { title: "Total Earnings", value: `$${performanceMetrics.totalEarnings.toFixed(2)}`, icon: DollarSign, color: "bg-soft-pink" },
                { title: "Weekly Earnings", value: `$${performanceMetrics.weeklyEarnings.toFixed(2)}`, icon: TrendingUp, color: "bg-pale-blue" },
                { title: "Completion Rate", value: `${performanceMetrics.completionRate}%`, icon: Award, color: "bg-light-teal" },
                { title: "Daily Average", value: `$${performanceMetrics.averageDaily.toFixed(2)}`, icon: BarChart3, color: "bg-muted-yellow" }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(45, 58, 74, 0.15)"
                  }}
                  className="bg-slate-800 rounded-xl p-4 md:p-6 border border-slate-700 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${metric.color}`}>
                      <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-[#2D2D2D]" />
                    </div>
                    <span className="text-xl md:text-2xl">🌌</span>
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs md:text-sm text-slate-400">{metric.title}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Section Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8"
            >
              <button
                onClick={() => setActiveSection('ads')}
                className={`flex items-center justify-center sm:justify-start space-x-3 px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                  activeSection === 'ads'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white border-slate-600'
                }`}
              >
                <Play className="w-5 h-5" />
                <span>Ads Cosmos</span>
              </button>
              <button
                onClick={() => setActiveSection('social')}
                className={`flex items-center justify-center sm:justify-start space-x-3 px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                  activeSection === 'social'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white border-slate-600'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Social Cosmos</span>
              </button>
              <button
                onClick={() => setActiveSection('sites')}
                className={`flex items-center justify-center sm:justify-start space-x-3 px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 border ${
                  activeSection === 'sites'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white border-slate-600'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span>Site Cosmos</span>
              </button>
            </motion.div>

            {/* Content sections would continue here... */}
            {/* This is a simplified version - the full WorkPortal content would be much longer */}
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-4">Work Portal Active</h2>
              <p className="text-slate-300 mb-8">
                Welcome to the Cosmic Workplace - your gateway to earning opportunities across multiple universes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <Play className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Ads Cosmos</h3>
                  <p className="text-slate-300">Watch premium video advertisements and earn rewards</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Social Cosmos</h3>
                  <p className="text-slate-300">Complete social media tasks and engage with content</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Site Cosmos</h3>
                  <p className="text-slate-300">Visit websites and explore new platforms</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
});

export default WorkPage;