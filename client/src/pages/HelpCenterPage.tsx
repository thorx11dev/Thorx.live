import { Link } from 'wouter';
import { ArrowLeft, Search, HelpCircle, Book, Mail, Rocket, Satellite, Globe, ChevronRight, Star, Shield, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThorxLogo from '../components/ThorxLogo';

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    {
      icon: Star,
      title: "Getting Started",
      description: "Learn the basics of using Thorx",
      articles: [
        "How to create your account",
        "Setting up your profile",
        "Understanding the dashboard",
        "Your first task"
      ]
    },
    {
      icon: Shield,
      title: "Account & Security",
      description: "Manage your account safely",
      articles: [
        "Password security best practices",
        "Two-factor authentication setup",
        "Account verification process",
        "Privacy settings guide"
      ]
    },
    {
      icon: Clock,
      title: "Tasks & Earnings",
      description: "Maximize your earning potential",
      articles: [
        "How to find high-paying tasks",
        "Task completion guidelines",
        "Payment processing times",
        "Withdrawal methods"
      ]
    }
  ];

  const faqItems = [
    {
      question: "How do I get started with Thorx?",
      answer: "Getting started is simple! Create your free account, complete your profile, and start browsing available tasks. Our onboarding guide will walk you through each step."
    },
    {
      question: "How long does it take to receive payments?",
      answer: "Payments are typically processed within 24-48 hours after task completion. Withdrawal processing times vary by payment method, usually 1-3 business days."
    },
    {
      question: "What types of tasks are available?",
      answer: "We offer a wide variety of tasks including data entry, content creation, social media management, research, and specialized skills-based projects."
    },
    {
      question: "Is there a minimum payout amount?",
      answer: "Yes, the minimum payout amount is $10.00. This helps reduce transaction fees and ensures efficient payment processing."
    },
    {
      question: "How do I increase my earning potential?",
      answer: "Complete your profile fully, maintain high task completion rates, develop specialized skills, and consistently deliver quality work to access higher-paying opportunities."
    },
    {
      question: "What support options are available?",
      answer: "We offer 24/7 support through email support, phone assistance during business hours, and comprehensive documentation in our help center."
    }
  ];

  const filteredFAQ = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-900">
        <div
          className="absolute w-96 h-96 rounded-full pointer-events-none opacity-10 top-1/4 right-1/3"
          style={{
            background: 'radial-gradient(circle, rgba(100, 116, 139, 0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Constellation Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="constellation-help" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#64748b" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="100" r="1" fill="#64748b" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#constellation-help)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 opacity-10 animate-spin" style={{ animationDuration: '60s' }}>
          <Satellite className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="absolute top-2/3 right-1/4 opacity-10 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }}>
          <Globe className="w-12 h-12 text-slate-600" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <ThorxLogo size="md" className="text-slate-200 group-hover:text-white transition-colors" />
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
            <span className="block text-slate-400">Help</span>
            <span>Center</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Find answers to your questions and get the support you need to succeed with Thorx.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-slate-800/80 transition-all duration-300 hover:border-slate-600 backdrop-blur-sm shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-200 mb-12 text-center">Browse by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-sm hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-700 transition-colors shadow-lg">
                  <category.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 mb-4 text-center group-hover:text-white transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-slate-400 mb-6 text-center leading-relaxed group-hover:text-slate-300 transition-colors">
                  {category.description}
                </p>
                
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-300 transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                      <span className="text-sm hover:text-slate-200 cursor-pointer transition-colors">{article}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-200 mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {filteredFAQ.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-3 text-slate-400" />
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="relative z-10 py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-200">
            Still Need Help?
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Our support team is here to help you 24/7. Choose your preferred way to get in touch.
          </p>
          
          <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
            {[
              { 
                icon: Mail, 
                title: "Email Support", 
                description: "Get detailed assistance from our support team", 
                action: "Send Email",
                email: "support@thorx.live",
                availability: "24/7 Response"
              }
            ].map((contact, index) => (
              <div
                key={index}
                className="relative bg-slate-800/70 p-10 rounded-3xl border border-slate-700/50 hover:border-slate-500/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-slate-900/50 backdrop-blur-lg hover:scale-105 hover:-translate-y-2 text-center overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/15 via-slate-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Enhanced border glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-600/25 via-slate-500/25 to-slate-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-slate-500/30 rounded-full animate-ping delay-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-slate-400/40 rounded-full animate-ping delay-700" />
                </div>
                
                {/* Enhanced icon container */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:from-slate-700 group-hover:to-slate-800 transition-all duration-500 shadow-2xl group-hover:shadow-slate-600/30 group-hover:scale-110">
                  <contact.icon className="w-12 h-12 text-slate-400 group-hover:text-slate-200 transition-all duration-500 group-hover:scale-110" />
                  
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 rounded-3xl bg-slate-500/20 animate-ping opacity-0 group-hover:opacity-100" />
                  <div className="absolute inset-2 rounded-2xl bg-slate-400/10 animate-ping opacity-0 group-hover:opacity-100 delay-200" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-200 mb-4 group-hover:text-white transition-colors duration-300">
                  {contact.title}
                </h3>
                
                <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed text-lg">
                  {contact.description}
                </p>
                
                {/* Enhanced email display */}
                <div className="mb-6">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-3 text-slate-300 hover:text-white font-semibold text-lg bg-slate-700/50 px-6 py-3 rounded-xl hover:bg-slate-600/50 transition-all duration-300 group-hover:scale-105 border border-slate-600/30 hover:border-slate-500/50"
                  >
                    <Mail className="w-5 h-5" />
                    {contact.email}
                  </a>
                </div>
                
                {/* Availability badge */}
                <div className="flex items-center justify-center text-slate-500 text-sm mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="bg-slate-700/50 px-4 py-2 rounded-full border border-slate-600/30">
                    {contact.availability}
                  </span>
                </div>
                
                {/* Enhanced call-to-action button */}
                <button 
                  onClick={() => window.location.href = `mailto:${contact.email}`}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 px-8 py-4 rounded-xl font-bold hover:from-slate-600 hover:to-slate-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-700/30 transform active:scale-95 group-hover:shadow-xl border border-slate-600/30 hover:border-slate-500/50"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Mail className="w-5 h-5" />
                    {contact.action}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-800/50 py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-4 hover:scale-105 transition-all duration-300">
              <ThorxLogo size="lg" className="text-slate-200 group-hover:text-white transition-colors" />
            </Link>
            <p className="text-slate-400">Navigate the digital universe with confidence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenterPage;