import { Link, useParams } from 'wouter';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Rocket, Satellite, Globe, TrendingUp, Star, Shield, Zap, Target, Award } from 'lucide-react';
import { useEffect } from 'react';

const BlogPostPage = () => {
  const params = useParams();
  
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0f172a';
    window.scrollTo(0, 0);
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const blogPosts = {
    "1": {
      id: 1,
      title: "The Future of Digital Earning: Trends to Watch in 2025",
      author: "Aon Imran",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "Industry Insights",
      tags: ["Digital Economy", "Future Trends", "AI"],
      icon: TrendingUp,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>The digital earning landscape is rapidly evolving, driven by technological advancements, changing work patterns, and new economic models. As we progress through 2025, several key trends are reshaping how individuals generate income online.</p>
          
          <h2>1. AI-Powered Task Optimization</h2>
          <p>Artificial Intelligence is revolutionizing task matching and optimization. Platforms are now using sophisticated algorithms to:</p>
          <ul>
            <li>Match users with tasks based on their skills, preferences, and performance history</li>
            <li>Predict optimal task sequences for maximum earnings</li>
            <li>Provide real-time feedback and suggestions for improvement</li>
            <li>Automate routine processes, allowing users to focus on high-value activities</li>
          </ul>

          <h2>2. Decentralized Earning Platforms</h2>
          <p>Blockchain technology is enabling new models of decentralized earning platforms that offer:</p>
          <ul>
            <li>Greater transparency in payment processing</li>
            <li>Reduced platform fees through smart contracts</li>
            <li>Global accessibility without traditional banking barriers</li>
            <li>Token-based reward systems with additional earning potential</li>
          </ul>

          <h2>3. Micro-Learning and Skill Monetization</h2>
          <p>The ability to quickly acquire and monetize new skills is becoming increasingly important. Key developments include:</p>
          <ul>
            <li>Just-in-time learning platforms integrated with earning opportunities</li>
            <li>Certification systems that immediately unlock new task categories</li>
            <li>Skill marketplaces where expertise becomes a tradeable commodity</li>
            <li>Collaborative learning communities with shared earning opportunities</li>
          </ul>

          <h2>4. Real-Time Analytics and Performance Tracking</h2>
          <p>Data-driven insights are becoming essential for optimizing digital earning strategies:</p>
          <ul>
            <li>Comprehensive dashboards showing earning patterns and trends</li>
            <li>Predictive analytics for future earning potential</li>
            <li>Benchmarking against top performers in similar categories</li>
            <li>Automated reporting and tax preparation features</li>
          </ul>

          <h2>5. Cross-Platform Integration</h2>
          <p>The future of digital earning lies in seamless integration across multiple platforms:</p>
          <ul>
            <li>Universal profiles that work across different earning platforms</li>
            <li>Consolidated payment systems and portfolio management</li>
            <li>Cross-platform reputation and rating systems</li>
            <li>Unified analytics and performance tracking</li>
          </ul>

          <h2>Conclusion</h2>
          <p>The digital earning landscape of 2025 promises unprecedented opportunities for those who adapt to these emerging trends. Success will depend on embracing technology, continuously developing skills, and leveraging data-driven insights to optimize earning potential.</p>
          
          <p>At Thorx, we're committed to staying at the forefront of these developments, ensuring our platform incorporates the latest innovations to maximize our users' earning potential.</p>
        </div>
      `
    },
    "2": {
      id: 2,
      title: "Maximizing Your Earning Potential: Advanced Strategies",
      author: "Zain Abbas",
      date: "January 12, 2025",
      readTime: "12 min read",
      category: "Strategy",
      tags: ["Earning Tips", "Productivity", "Success"],
      icon: Star,
      content: `
        <div class="prose prose-slate prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>Maximizing your earning potential on digital platforms requires more than just completing tasks. It demands strategic thinking, continuous optimization, and a deep understanding of the platform dynamics.</p>
          
          <h2>1. Strategic Task Selection</h2>
          <p>Not all tasks are created equal. Smart earners focus on:</p>
          <ul>
            <li><strong>High-value tasks:</strong> Prioritize tasks with better hourly rates</li>
            <li><strong>Skill-building opportunities:</strong> Choose tasks that develop valuable capabilities</li>
            <li><strong>Batch processing:</strong> Group similar tasks to improve efficiency</li>
            <li><strong>Long-term relationships:</strong> Build connections with regular clients</li>
          </ul>

          <h2>2. Time Management Excellence</h2>
          <p>Effective time management is crucial for maximizing earnings:</p>
          <ul>
            <li><strong>Peak hours optimization:</strong> Identify when premium tasks are available</li>
            <li><strong>Productivity tracking:</strong> Monitor your performance across different times</li>
            <li><strong>Break scheduling:</strong> Maintain consistent performance with proper rest</li>
            <li><strong>Multi-tasking strategies:</strong> Handle multiple tasks without quality loss</li>
          </ul>

          <h2>3. Skill Development Pipeline</h2>
          <p>Continuous learning ensures access to higher-paying opportunities:</p>
          <ul>
            <li><strong>Market research:</strong> Identify high-demand skills in your field</li>
            <li><strong>Structured learning:</strong> Create learning plans with measurable goals</li>
            <li><strong>Practice projects:</strong> Build portfolio pieces while learning</li>
            <li><strong>Certification pursuit:</strong> Obtain recognized credentials</li>
          </ul>

          <h2>4. Performance Optimization</h2>
          <p>Small improvements compound over time:</p>
          <ul>
            <li><strong>Quality consistency:</strong> Maintain high standards across all tasks</li>
            <li><strong>Speed improvements:</strong> Develop efficient workflows and shortcuts</li>
            <li><strong>Communication skills:</strong> Build strong relationships with task providers</li>
            <li><strong>Feedback implementation:</strong> Actively use feedback to improve</li>
          </ul>

          <h2>5. Financial Management</h2>
          <p>Smart financial management amplifies your earning success:</p>
          <ul>
            <li><strong>Diversification:</strong> Don't rely on a single income stream</li>
            <li><strong>Reinvestment:</strong> Use earnings to upgrade tools and skills</li>
            <li><strong>Emergency fund:</strong> Build financial security for consistency</li>
            <li><strong>Tax optimization:</strong> Understand and leverage applicable deductions</li>
          </ul>

          <h2>6. Technology Leverage</h2>
          <p>Use technology to gain competitive advantages:</p>
          <ul>
            <li><strong>Automation tools:</strong> Streamline repetitive processes</li>
            <li><strong>Analytics platforms:</strong> Track and analyze your performance</li>
            <li><strong>Collaboration software:</strong> Improve team-based task efficiency</li>
            <li><strong>Mobile optimization:</strong> Earn on-the-go with mobile strategies</li>
          </ul>

          <h2>Conclusion</h2>
          <p>Maximizing earning potential is a continuous process that requires dedication, strategy, and adaptability. By implementing these advanced strategies, you can significantly increase your income while building sustainable, long-term success in the digital economy.</p>
        </div>
      `
    }
  };

  const postId = params.id || "1";
  const post = blogPosts[postId as keyof typeof blogPosts] || blogPosts["1"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/4 right-1/4"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-post" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-post)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-3/4 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
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
            to="/blog" 
            className="text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-200 mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 mb-8">
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
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {post.tags.map((tag, index) => (
                <span key={index} className="flex items-center gap-1 px-3 py-1 text-xs text-slate-400 bg-slate-800/50 rounded-full border border-slate-700">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-slate-200 transition-all duration-300 hover:scale-105">
              <Share2 className="w-4 h-4" />
              Share Article
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 p-8 lg:p-12 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div 
              className="text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}
            />
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-200 mb-8 text-center">Continue Reading</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(blogPosts).filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                    <relatedPost.icon className="w-6 h-6 text-slate-400 group-hover:text-slate-300 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-200 mb-3 group-hover:text-white transition-colors">
                    {relatedPost.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span>{relatedPost.author}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                  
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
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

export default BlogPostPage;