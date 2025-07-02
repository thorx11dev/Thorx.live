import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Shield, Users, TrendingUp, DollarSign } from 'lucide-react';
import CosmicSphere from '../components/3d/CosmicSphere';
import ParticleField from '../components/3d/ParticleField';
import CircularStars from '../components/3d/CircularStars';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Hero Section */}
      <div className="relative h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            {/* Enhanced Circular Stars Component */}
            <CircularStars />
            
            <ParticleField />
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
              <CosmicSphere />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4 leading-tight">
                <span className="bg-gradient-to-r from-soft-pink via-pale-blue to-light-teal bg-clip-text text-transparent font-extrabold">
                  Thorx
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-8 max-w-2xl mx-auto font-medium">
                The next-generation earning platform designed for the cosmic age. 
                Join 100,000+ users in the future of digital income.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/dashboard">
                <motion.button
                  className="bg-gradient-to-r from-soft-pink to-pale-blue hover:from-pale-blue hover:to-light-teal font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 border-2 border-transparent"
                  style={{ 
                    color: '#000000',
                    fontWeight: '800',
                    textShadow: '0 1px 3px rgba(255,255,255,0.8)'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    color: '#000000'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                className="bg-white/20 backdrop-blur-lg border-2 border-white/30 text-primary font-bold px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: '700',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  borderColor: 'rgba(255, 255, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Watch Demo</span>
                <Zap className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Cosmic Features
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Experience the future of digital earning with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connect with opportunities worldwide through our cosmic network",
                color: "from-soft-pink to-pale-blue"
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description: "Bank-grade security with end-to-end encryption for all transactions",
                color: "from-pale-blue to-light-teal"
              },
              {
                icon: Users,
                title: "100K+ Users",
                description: "Join our thriving community of digital entrepreneurs",
                color: "from-light-teal to-muted-yellow"
              },
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description: "Track your performance with advanced 3D visualizations",
                color: "from-muted-yellow to-peach-coral"
              },
              {
                icon: DollarSign,
                title: "Instant Payouts",
                description: "Get paid instantly with our JazzCash integration",
                color: "from-peach-coral to-soft-pink"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Experience sub-100ms response times for all operations",
                color: "from-cosmic-purple to-cosmic-blue"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className="bg-secondary rounded-2xl p-8 shadow-primary hover:shadow-secondary transition-all duration-300 border border-primary h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-secondary leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-soft-pink/10 via-pale-blue/10 to-light-teal/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100K+", label: "Active Users" },
              { number: "$2M+", label: "Earned Total" },
              { number: "99.9%", label: "Uptime" },
              { number: "<100ms", label: "Response Time" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Ready to Launch Your Cosmic Journey?
            </h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already earning with Thorx. 
              Start your journey to financial freedom today.
            </p>
            <Link to="/dashboard">
              <motion.button
                className="bg-gradient-to-r from-soft-pink via-pale-blue to-light-teal hover:from-pale-blue hover:via-light-teal hover:to-muted-yellow font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-2 border-transparent"
                style={{ 
                  color: '#000000',
                  fontWeight: '800',
                  textShadow: '0 1px 3px rgba(255,255,255,0.8)'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  color: '#000000'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;