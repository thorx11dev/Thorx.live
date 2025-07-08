import React from 'react';
import ThorxLogo from './ThorxLogo';

// Brand variants for different contexts
export const ThorxBrandVariants = {
  // Navigation brand
  NavBrand: () => (
    <ThorxLogo size="sm" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
  ),
  
  // Footer brand
  FooterBrand: () => (
    <ThorxLogo size="md" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
  ),
  
  // Hero brand (large)
  HeroBrand: () => (
    <ThorxLogo size="xl" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
  ),
  
  // Authentication page brand
  AuthBrand: () => (
    <ThorxLogo size="lg" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
  ),
  
  // Dashboard brand
  DashboardBrand: () => (
    <ThorxLogo size="sm" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
  ),
  
  // Icon only variants
  IconOnly: {
    small: () => <ThorxLogo size="xs" showText={false} logoColor="#e2e8f0" />,
    medium: () => <ThorxLogo size="sm" showText={false} logoColor="#e2e8f0" />,
    large: () => <ThorxLogo size="md" showText={false} logoColor="#e2e8f0" />
  },
  
  // Themed variants
  Light: {
    nav: () => <ThorxLogo size="sm" showText={true} textColor="text-slate-800" logoColor="#1e293b" />,
    footer: () => <ThorxLogo size="md" showText={true} textColor="text-slate-800" logoColor="#1e293b" />,
    hero: () => <ThorxLogo size="xl" showText={true} textColor="text-slate-800" logoColor="#1e293b" />
  },
  
  Dark: {
    nav: () => <ThorxLogo size="sm" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />,
    footer: () => <ThorxLogo size="md" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />,
    hero: () => <ThorxLogo size="xl" showText={true} textColor="text-slate-200" logoColor="#e2e8f0" />
  }
};

export default ThorxBrandVariants;