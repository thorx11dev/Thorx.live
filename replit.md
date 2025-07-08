# Thorx - Cosmic Earning Platform

## Overview

Thorx is a modern full-stack web application built for the cosmic age of digital income. It's a comprehensive earning platform that allows users to complete tasks, track earnings, and manage payouts through an intuitive interface. The application features a React frontend with TypeScript, a Node.js/Express backend, and uses PostgreSQL with Drizzle ORM for data management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components with Radix UI primitives
- **State Management**: TanStack Query for server state, React Context for global state
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **3D Graphics**: Three.js with React Three Fiber for cosmic visual elements
- **Routing**: React Router for client-side navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based session storage
- **API Design**: RESTful API structure with /api prefix

### Design System
- **Theme**: Cosmic-inspired with dual light/dark mode support
- **Color Palette**: Soft pink, pale blue, and light teal primary colors
- **Typography**: Custom font system with CSS variables
- **Components**: Consistent spacing, borders, and shadows using CSS custom properties
- **Accessibility**: High-contrast alternatives and mobile-first responsive design

## Key Components

### Authentication System
- JWT-based authentication with secure token storage
- User registration and login with form validation
- Password strength checking and secure password handling
- Protected routes with automatic redirection
- Session persistence with localStorage

### Earning System
- Multiple earning categories: Ads Cosmos, Social Cosmos, Site Cosmos
- Real-time earnings tracking and visualization
- Task completion monitoring with progress indicators
- Performance analytics and trend analysis
- Comprehensive dashboard with interactive charts

### Payout System
- JazzCash integration for mobile wallet transfers
- 13% platform fee structure with transparent calculations
- Minimum payout threshold of $10.00
- Instant transfer processing
- Transaction history and error handling

### Performance Optimization
- Dedicated performance center with 100x optimization targets
- Real-time performance simulation and monitoring
- Bundle optimization and code splitting strategies
- Caching mechanisms and database query optimization
- Memory and CPU usage tracking

## Data Flow

### Frontend to Backend
1. User actions trigger API calls to Express endpoints
2. Authentication middleware validates JWT tokens
3. Route handlers process requests and interact with storage layer
4. Responses return JSON data with consistent error handling

### Database Integration
1. Drizzle ORM handles database schema and migrations
2. Type-safe database operations with TypeScript integration
3. Connection pooling through Neon Database serverless architecture
4. Structured data validation using Zod schemas

### State Management
1. TanStack Query manages server state caching and synchronization
2. React Context provides global state for authentication and theme
3. Local storage persists user preferences and session data
4. Real-time updates through optimistic UI patterns

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: drizzle-orm with drizzle-zod for type-safe database operations
- **UI Framework**: React with @radix-ui components for accessibility
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **State Management**: @tanstack/react-query for server state management
- **Animations**: framer-motion for smooth UI transitions
- **3D Graphics**: @react-three/fiber and @react-three/drei for cosmic visuals

### Development Tools
- **Build System**: Vite with TypeScript support
- **Linting**: ESLint with TypeScript configuration
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Development Server**: Hot module replacement with Vite dev server

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` directory using Vite
2. Backend compiles to `dist/index.js` using esbuild
3. Database migrations run automatically via Drizzle Kit
4. Environment variables configure database connections and API keys

### Production Configuration
- **Server**: Node.js production server with Express
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Static Files**: Served from Express with fallback to React app
- **Error Handling**: Comprehensive error middleware with logging

### Environment Setup
- Development: Uses local development server with hot reload
- Production: Optimized builds with minification and compression
- Database: Automatic schema synchronization with Drizzle migrations
- Monitoring: Request logging and performance tracking

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
- July 02, 2025. Migrated from Bolt to Replit environment
- July 02, 2025. Added PostgreSQL database with Drizzle ORM
- July 02, 2025. Implemented complete authentication system with JWT
- July 02, 2025. Added database schema for users, tasks, and payouts
- July 02, 2025. Replaced React Router with wouter for routing
- July 02, 2025. Fixed Three.js components for Replit compatibility
- July 02, 2025. Implemented enhanced cosmic animations for light mode landing page
- July 02, 2025. Forced landing page to permanent dark mode for consistent experience
- July 03, 2025. Enhanced landing page with comprehensive animation system
- July 03, 2025. Fixed navigation routing for Get Started and Sign In buttons
- July 03, 2025. Integrated complete authentication flow with useAuth hook
- July 03, 2025. Added comprehensive animation suite: entrance animations, micro-interactions, scroll-triggered effects, 3D object animations, page transitions, animated backgrounds, loading screens, interactive navigation, hover effects, and motion path animations
- July 07, 2025. Fixed critical React rendering issue that prevented landing page from displaying
- July 07, 2025. Restored full cosmic landing page with all sections: hero, features, benefits, stats, CTA, and footer
- July 07, 2025. Maintained exact cosmic design theme with dark slate background and animated elements
- July 07, 2025. Successfully replaced framer-motion with CSS animations to resolve compatibility issues
- July 07, 2025. Confirmed all landing page sections are now visible and working properly
- July 07, 2025. Created comprehensive multi-page structure with cosmic theme consistency
- July 07, 2025. Added FeaturesPage, UpdatesPage, HelpCenterPage, ContactPage, AboutPage, and BlogPage
- July 07, 2025. Implemented animated cosmic environments across all pages with creative floating elements
- July 07, 2025. Updated footer navigation to link to all new pages
- July 07, 2025. Integrated all new pages into App.tsx routing system
- July 07, 2025. Fixed critical color instability issue by removing forced dark mode conflicts across all pages
- July 07, 2025. Enhanced theme system with proper localStorage persistence and stable CSS custom properties
- July 07, 2025. Added stable button styling classes with !important rules for consistent UI element colors
- July 07, 2025. Dramatically enhanced landing page sections (excluding hero) with sophisticated animations, 3D effects, and minimalistic design
- July 07, 2025. Implemented advanced features: fade-in animations, magnetic hover effects, orbital particles, data visualization backgrounds, cosmic energy waves, gradient overlays, and enhanced CTA buttons with shimmer effects
- July 07, 2025. CRITICAL FIX: Completely resolved color instability issue by removing all forced dark mode from AuthPage.tsx and LandingPageBackup.tsx
- July 07, 2025. Enhanced theme system with stronger CSS properties, data-theme attributes, and !important rules to prevent any future color conflicts
- July 07, 2025. Added absolute priority styling for buttons and theme elements to ensure permanent color stability
- July 07, 2025. MAJOR ENHANCEMENT: Implemented realistic 3D animated clouds with parallax scrolling effects throughout the landing page
- July 07, 2025. Created volumetric cloud system with 6-layer depth, wispy edges, enhanced lighting, and atmospheric scattering
- July 07, 2025. Added mouse interaction for subtle cloud response and natural drift animations for "exploration" effect
- July 07, 2025. Optimized cloud performance with CSS-based rendering and smooth parallax scrolling at different speeds
- July 07, 2025. Integrated clouds across multiple sections with varying densities and scroll factors for immersive depth
- July 08, 2025. CRITICAL FIX: Resolved button text color inconsistency between Replit preview and browser preview
- July 08, 2025. Replaced gradient backgrounds with solid colors and added cross-browser compatibility overrides
- July 08, 2025. Implemented webkit-specific text fill overrides and comprehensive meta tags for consistent rendering
- July 08, 2025. ICON VISIBILITY FIX: Resolved icon visibility issues during hover interactions in Cosmic Features section
- July 08, 2025. Added targeted CSS overrides for icon rendering conflicts, improved z-index management, and cross-browser compatibility
- July 08, 2025. BULLETPROOF ICON IMPLEMENTATION: Completely rebuilt Cosmic Features section with isolated icon positioning
- July 08, 2025. Implemented absolute positioning with z-index 100+ for guaranteed icon visibility during all user interactions
- July 08, 2025. Added thorx-bulletproof-icon class with cross-browser compatibility and hardware acceleration optimization
- July 08, 2025. FINAL SOLUTION: Stripped all complex animations and effects from Cosmic Features section
- July 08, 2025. Implemented clean, simple design with thorx-clean-icon class for perfect icon visibility
- July 08, 2025. Removed all potential conflicts: orbital particles, rotating effects, complex gradients, and layered animations
- July 08, 2025. RECREATED COSMIC FEATURES: Rebuilt section with new subtle interaction patterns
- July 08, 2025. Added accent colors per card, gentle ripple effects, sliding accent lines, and enhanced hover states
- July 08, 2025. Implemented thorx-feature-icon class with smooth scaling and color transitions for perfect visibility
- July 08, 2025. ENHANCED COSMIC FEATURES: Completely redesigned with advanced interactive elements
- July 08, 2025. Added magnetic icons with orbital animations, floating particles, morphing gradients, and expanding rings
- July 08, 2025. Implemented thorx-magnetic-icon class with dynamic hover effects, 3D transforms, and sweep light animations
- July 08, 2025. CONSTELLATION COSMIC FEATURES: Complete redesign with constellation theme inspired by stats section
- July 08, 2025. Added constellation background patterns, orbital rings, cosmic energy fields, and holographic reflections
- July 08, 2025. Implemented thorx-constellation-icon class with 3D transforms, larger cards, and cosmic scanning lines
- July 08, 2025. UPDATED COSMIC ICONS: Replaced feature icons with more diverse and visually appealing alternatives
- July 08, 2025. Changed to Rocket (🚀), Gem (💎), Trophy (🏆), and Headphones (🎧) icons for better visual representation
- July 08, 2025. RECREATED FEATURES SECTION: Complete rebuild with neo-cosmic design theme and quantum field effects
- July 08, 2025. Added quantum field grid, holographic elements, floating satellites, and feature badges
- July 08, 2025. Implemented thorx-neo-icon class with advanced 3D transforms and holographic scan lines
- July 08, 2025. REMOVED GLOW EFFECTS: Cleaned up Features section by removing all glowing light effects from cards per user request
- July 08, 2025. REPLACED GRADIENTS WITH SOLID COLORS: Updated all gradient backgrounds to minimalistic solid colors throughout landing page
- July 08, 2025. Replaced gradient buttons with solid colors, updated feature overlays to use solid colors (bg-blue-500/10, bg-green-500/15, etc.)
- July 08, 2025. Removed gradient scan lines, cosmic energy fields, and title glow effects for cleaner illustrative design
- July 08, 2025. IMPLEMENTED CUSTOM THORX LOGO: Created comprehensive SVG-based ThorxLogo component with hexagonal design
- July 08, 2025. Added scalable logo branding (xs, sm, md, lg, xl, 2xl sizes) with cosmic animations and tagline integration
- July 08, 2025. Deployed logo across navigation, footer, hero section, and Navbar component for consistent branding
- July 08, 2025. Created ThorxBrandVariants component for standardized logo usage across different contexts
- July 08, 2025. SIMPLIFIED LOGO BRANDING: Removed text and tagline from logo component for cleaner icon-only design
- July 08, 2025. Added standalone tagline "Navigate the digital universe with confidence" only to footer section
- July 08, 2025. Updated all logo implementations to use simplified logo-only format throughout website
- July 08, 2025. REPOSITIONED LANDING PAGE LOGO: Moved Thorx logo from hero section to top-left navigation corner
- July 08, 2025. Increased navigation logo size from sm to md for better visibility and brand presence
- July 08, 2025. CREATED UPCOMING FEATURES SECTION: Added comprehensive animated upcoming features section to Updates page
- July 08, 2025. Featured Thorx Mobile App, Telegram Bot, and Giveaway Technologies with interactive cards and hover animations
- July 08, 2025. Implemented scroll-triggered animations, floating particles, and expandable feature details on hover
- July 08, 2025. Added status badges, timelines, and call-to-action integration with newsletter signup
- July 08, 2025. REDUCED GLASS EFFECTS: Significantly lowered backdrop-blur intensity across landing page from backdrop-blur-xl to backdrop-blur-sm
- July 08, 2025. Updated all glass card backgrounds from high opacity (70-90%) to subtle opacity (30-50%) for better cloud visibility
- July 08, 2025. Maintained parallax scrolling cloud visibility while preserving modern glass morphism aesthetic
- July 08, 2025. REMOVED LIVE CHAT FEATURE: Completely removed Live Chat functionality from HelpCenterPage contact section
- July 08, 2025. Updated contact support grid from 3 columns to 2 columns (Email Support and Phone Support only)
- July 08, 2025. Removed MessageCircle import and updated FAQ answer to exclude live chat references
- July 08, 2025. Verified Telegram Bot feature in UpdatesPage is legitimate task management tool, not live chat support
- July 08, 2025. REPLACED ABOUT PAGE JOURNEY SECTION: Completely redesigned Journey section with modern MVP section
- July 08, 2025. Added comprehensive MVP section with Core Vision, Launch Strategy, Core Features grid, and Development Progress timeline
- July 08, 2025. Implemented interactive progress bars, hover animations, and responsive design across all MVP components
- July 08, 2025. Enhanced MVP section with 3-phase development timeline showing Foundation (100%), Core Features (85%), and Enhancement (25%)
- July 08, 2025. UPDATED ALL PAGES TO NEW THORX LOGO: Replaced old Rocket icon logo with new ThorxLogo component across all pages
- July 08, 2025. Updated navigation and footer sections in BlogPage, BlogPostPage, AboutPage, ContactPage, FeaturesPage, HelpCenterPage, and LandingPageBackup
- July 08, 2025. Ensured consistent branding with scalable ThorxLogo component (md size for navigation, lg size for footers)
- July 08, 2025. Removed old Rocket icon implementations and updated all imports to use ThorxLogo from components directory
- July 08, 2025. PROFESSIONAL COSMIC REFINEMENT: Transformed landing page from gamified to sleek professional cosmic illustration style
- July 08, 2025. Added comprehensive professional cosmic theme CSS classes: cosmic-gradient-primary/secondary/accent, cosmic-glass/glass-light, cosmic-hover-lift, cosmic-text-glow/shadow
- July 08, 2025. Implemented refined animation system: cosmic-fade-in, cosmic-slide-up, cosmic-scale-in with staggered timing delays
- July 08, 2025. Updated hero section with professional cosmic gradients, elegant orbital rings, sophisticated gradient orbs, and refined constellation patterns
- July 08, 2025. Enhanced navigation with professional styling: cosmic-btn-primary/secondary classes, gradient underlines, improved hover states
- July 08, 2025. Refined features section with cosmic-glass cards, professional icon containers, elegant background gradients, and clean accent lines
- July 08, 2025. Updated stats section with cosmic-hover-lift effects, professional glass morphism, clean typography, and sophisticated animations
- July 08, 2025. Maintained all existing functionality including 3D parallax clouds, hero section structure, and interactive elements while improving visual elegance
- July 08, 2025. COMPLETED REMAINING SECTIONS: Updated Benefits section and Call-to-Action section with professional cosmic styling
- July 08, 2025. Refined benefits cards with cosmic-glass effects, clean professional icons, elegant background gradients, and smooth hover animations
- July 08, 2025. Updated CTA section with professional cosmic buttons using cosmic-btn-primary/secondary classes and cosmic animation system
- July 08, 2025. Simplified trust indicators with cosmic-fade-in animations and consistent professional styling throughout all landing page sections
- July 08, 2025. TRANSFORMATION COMPLETE: All landing page sections now feature cohesive professional cosmic illustration style while preserving functionality
- July 08, 2025. INTERACTIVE COSMIC HEADER TEXT EFFECT: Implemented innovative cloud-concealment feature for all section headers
- July 08, 2025. Added cosmic-header-container wrapper with cosmic-cloud-veil overlay system for immersive text reveal interactions
- July 08, 2025. Created smooth hover/touch animations where clouds gently glide aside to reveal hidden header text with brightness/scale transitions
- July 08, 2025. Applied effect consistently across all sections: Hero, Features, Benefits, Stats, and CTA with cloudDrift keyframe animations
- July 08, 2025. Included cross-browser compatibility and touch device support for optimal user experience across all platforms
- July 08, 2025. ENHANCED INTERACTIVE COSMIC HEADER TEXT EFFECT: Dramatically improved cloud concealment and text reveal interaction
- July 08, 2025. Increased cloud density with layered radial gradients and enhanced blur effects for more realistic cloud appearance
- July 08, 2025. Improved text concealment with brightness(0.3) and opacity(0.2) for stronger hiding effect within clouds
- July 08, 2025. Enhanced hover reveal with brightness(1.3), dual text shadows, and subtle scaling for dramatic text emergence
- July 08, 2025. Added sophisticated cloud movement with translateX/Y transforms and scaling during hover interactions
- July 08, 2025. Refined cloudDrift animation with organic scaling variations for more natural cloud movement patterns
- July 08, 2025. WHIMSICAL COSMIC STORYBOOK TRANSFORMATION: Redesigned header text effect with hand-drawn, delicate artistic quality
- July 08, 2025. Enhanced text concealment with brightness(0.25), opacity(0.15), and subtle blur for ethereal hiding effect
- July 08, 2025. Added whimsicalFloat animation with gentle vertical movement and scaling for magical text emergence
- July 08, 2025. Created organic cloud shapes using irregular border-radius and multi-layered radial gradients for fluffy appearance
- July 08, 2025. Implemented whimsicalCloudDrift animation with rotation and scaling variations for natural cloud movement
- July 08, 2025. Added whimsicalCloudDisperse animation for magical cloud dispersal during hover interactions
- July 08, 2025. Enhanced text shadow with triple-layered glow effects (white, blue, purple) for cosmic storybook atmosphere
- July 08, 2025. URGENT UI FIXES: Resolved four critical issues per user request
- July 08, 2025. Fixed header text glow by removing cosmic-text-glow text-shadow effects across all sections
- July 08, 2025. Redesigned hero section with Thorx logo font style and minimalistic slate colors for professional appearance
- July 08, 2025. Enhanced cloud visual quality with high-fidelity realistic appearance using layered radial gradients and proper blur effects
- July 08, 2025. Removed hover box outline effect from header text containers for clean aesthetic
- July 08, 2025. FINAL FONT & EFFECT FIXES: Applied exact Thorx logo font style to all header text sections
- July 08, 2025. Completely removed all glow effects from header text (text-shadow: none !important)
- July 08, 2025. Reduced cloud opacity to 0.6/0.55 for subtler appearance per user request
- July 08, 2025. Updated all section headers to use thorx-hero-title class with exact logo typography
- July 08, 2025. Ensured clean, professional text appearance matching SVG logo design without any luminescence
- July 08, 2025. UNIFIED SIGN-IN GRADIENT THEME: Applied sign-in button gradient color to all header text
- July 08, 2025. Hero: "Explore the" (sign-in gradient), "Digital Universe" (sign-in gradient)
- July 08, 2025. Features: "Cosmic Features" (sign-in gradient)
- July 08, 2025. Benefits: "Why Choose Thorx?" (sign-in gradient) 
- July 08, 2025. Stats: "Trusted by Thousands" (sign-in gradient)
- July 08, 2025. CTA: "Ready to Start Your Journey?" (sign-in gradient)
- July 08, 2025. SIGN-IN BUTTON COLOR: All header text now uses linear gradient from #FADADD to #D6EAF8 matching navigation sign-in button
- July 08, 2025. REMOVED TEXT SHADOWS: Completely removed drop shadows from all header text for cleaner appearance
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```