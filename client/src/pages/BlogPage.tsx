import { Link } from 'wouter';
import { ArrowLeft, Calendar, Clock, User, Tag, ChevronRight, Rocket, Satellite, Globe, TrendingUp, Star, Shield, Zap, Target, Award } from 'lucide-react';
import { useEffect } from 'react';

const BlogPage = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Digital Earning: Trends to Watch in 2025",
      excerpt: "Explore the emerging trends and technologies that are reshaping how people earn money online. From AI-powered task matching to decentralized earning platforms, discover what's next in the digital economy.",
      author: "Alex Chen",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "Industry Insights",
      tags: ["Digital Economy", "Future Trends", "AI"],
      icon: TrendingUp,
      featured: true
    },
    {
      id: 2,
      title: "Maximizing Your Earning Potential: Advanced Strategies",
      excerpt: "Learn proven strategies to increase your income on digital platforms. This comprehensive guide covers task optimization, skill development, and time management techniques that successful earners use.",
      author: "Sarah Johnson",
      date: "January 12, 2025",
      readTime: "12 min read",
      category: "Strategy",
      tags: ["Earning Tips", "Productivity", "Success"],
      icon: Star,
      featured: false
    },
    {
      id: 3,
      title: "Security Best Practices for Digital Earners",
      excerpt: "Protect your digital assets and personal information while earning online. This essential guide covers password security, two-factor authentication, and how to identify and avoid common scams.",
      author: "Mike Rodriguez",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Security",
      tags: ["Security", "Privacy", "Best Practices"],
      icon: Shield,
      featured: false
    },
    {
      id: 4,
      title: "Building Sustainable Income Streams in the Digital Age",
      excerpt: "Discover how to create multiple income streams that provide financial stability and growth. Learn about diversification strategies, passive income opportunities, and long-term wealth building.",
      author: "Emily Zhang",
      date: "January 8, 2025",
      readTime: "10 min read",
      category: "Financial Planning",
      tags: ["Income Streams", "Financial Planning", "Sustainability"],
      icon: Target,
      featured: false
    },
    {
      id: 5,
      title: "The Psychology of High Performance: Mindset for Success",
      excerpt: "Understand the mental aspects of achieving success in digital earning. Explore goal setting, motivation techniques, and how to maintain peak performance while working remotely.",
      author: "Dr. Lisa Park",
      date: "January 5, 2025",
      readTime: "9 min read",
      category: "Personal Development",
      tags: ["Psychology", "Performance", "Mindset"],
      icon: Zap,
      featured: false
    },
    {
      id: 6,
      title: "From Beginner to Expert: Your Complete Learning Path",
      excerpt: "A comprehensive roadmap for anyone starting their digital earning journey. Learn about skill development, platform selection, and how to accelerate your progress from novice to expert level.",
      author: "James Wilson",
      date: "January 3, 2025",
      readTime: "15 min read",
      category: "Education",
      tags: ["Learning", "Beginner Guide", "Career Development"],
      icon: Award,
      featured: false
    }
  ];

  const categories = [
    "All",
    "Industry Insights",
    "Strategy",
    "Security",
    "Financial Planning",
    "Personal Development",
    "Education"
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Industry Insights": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "Strategy": "bg-green-500/20 text-green-300 border-green-500/30",
      "Security": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "Financial Planning": "bg-orange-500/20 text-orange-300 border-orange-500/30",
      "Personal Development": "bg-pink-500/20 text-pink-300 border-pink-500/30",
      "Education": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/3 left-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-blog" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-blog)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-2/3 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Globe className="w-12 h-12 text-slate-600" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-xl border border-slate-700 group-hover:bg-slate-700 transition-colors">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">Thorx</span>
          </Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link 
            to="/" 
            className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-200 mb-6 leading-tight">
            <span className="block text-slate-400">Thorx</span>
            <span>Blog</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Insights, strategies, and stories from the cosmic frontier of digital earning. Stay informed with expert guidance and industry trends.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105 ${
                  index === 0 
                    ? 'bg-slate-200 text-slate-900 border-slate-200' 
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-8">Featured Article</h2>
          
          {blogPosts.filter(post => post.featured).map((post) => (
            <div
              key={post.id}
              className="bg-slate-800/50 p-8 lg:p-12 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-sm">Featured</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-200 mb-4 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <button className="bg-slate-200 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 inline-flex items-center gap-2 group/btn hover:scale-105">
                    <span>Read Full Article</span>
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="hidden lg:flex justify-center">
                  <div className="w-64 h-64 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:bg-slate-700 transition-colors">
                    <post.icon className="w-24 h-24 text-slate-500 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <div
                key={post.id}
                className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <post.icon className="w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-white transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-400 mb-4 leading-relaxed group-hover:text-slate-300 transition-colors line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="flex items-center gap-1 text-xs text-slate-500">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-all duration-300 inline-flex items-center justify-center gap-2 group/btn hover:scale-105">
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Stay Updated
          </h2>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest insights, strategies, and updates from the Thorx community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors"
            />
            <button className="bg-slate-200 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-800/50 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-4 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 group-hover:bg-slate-700 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-slate-700/30">
                <Rocket className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors group-hover:rotate-12" />
              </div>
              <span className="text-2xl font-bold text-slate-200 group-hover:text-white transition-colors">Thorx</span>
            </Link>
            <p className="text-slate-400">Navigate the digital universe with confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;