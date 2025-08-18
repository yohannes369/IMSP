import React, { useState } from 'react';
import { 
  Shield, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  Wifi, 
  Cloud, 
  QrCode,
  CheckCircle,
  Settings,
  Smartphone,
  Database,
  Lock,
  Zap,
  Globe,
  HeadphonesIcon,
  BookOpen,
  Award
} from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const mainServices = [
    {
      title: 'Role-based Access Control',
      description: 'Comprehensive user management with Admin, Manager, Clerk, and Staff roles',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      features: [
        'Granular permission settings',
        'Custom role creation',
        'Audit trail for all actions',
        'Single sign-on (SSO) integration',
        'Multi-factor authentication'
      ],
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Advanced Tracking System',
      description: 'Professional barcode and serial number tracking with mobile scanning',
      icon: QrCode,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      features: [
        'QR code & barcode generation',
        'Mobile scanner app',
        'Serial number tracking',
        'Location-based inventory',
        'Asset lifecycle management'
      ],
      image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Smart Workflow Engine',
      description: 'Automated request and approval workflows with intelligent routing',
      icon: Settings,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      features: [
        'Custom approval chains',
        'Automated notifications',
        'Deadline management',
        'Priority-based routing',
        'Integration with external systems'
      ],
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Real-time Analytics',
      description: 'Comprehensive reporting and data visualization with predictive insights',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      features: [
        'Interactive dashboards',
        'Custom report builder',
        'Predictive analytics',
        'Export to multiple formats',
        'Scheduled report delivery'
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const additionalServices = [
    {
      title: 'AI Chatbot Assistant',
      description: 'Intelligent help system for instant support',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Email Notifications',
      description: 'Automated alerts and status updates',
      icon: Mail,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Offline Mode',
      description: 'Continue working without internet connection',
      icon: Wifi,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Cloud Architecture',
      description: 'Kubernetes-powered scalable infrastructure',
      icon: Cloud,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Mobile Apps',
      description: 'Native iOS and Android applications',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Data Security',
      description: 'Enterprise-grade security and encryption',
      icon: Lock,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'API Integration',
      description: 'Connect with your existing systems',
      icon: Database,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'High Performance',
      description: 'Lightning-fast response times',
      icon: Zap,
      color: 'from-yellow-500 to-red-500'
    }
  ];

  const supportServices = [
    {
      title: '24/7 Support',
      description: 'Round-the-clock technical assistance',
      icon: HeadphonesIcon,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Training Program',
      description: 'Comprehensive user training and onboarding',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Certification',
      description: 'Professional certification programs',
      icon: Award,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Global Reach',
      description: 'Worldwide deployment and support',
      icon: Globe,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Feature Suite
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Explore our comprehensive range of features designed to streamline your inventory operations 
            with cutting-edge technology and intelligent automation.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
              Start Free Trial
            </button>
            <button className="border border-white/30 hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Core Services</h2>
        
        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeService === index
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`p-8 rounded-2xl bg-gradient-to-br ${mainServices[activeService].bgColor} border border-white/20 dark:border-gray-700/50`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${mainServices[activeService].color} shadow-lg`}>
                {React.createElement(mainServices[activeService].icon, { className: "h-8 w-8 text-white" })}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{mainServices[activeService].title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{mainServices[activeService].description}</p>
              </div>
            </div>
            <div className="space-y-3">
              {mainServices[activeService].features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={mainServices[activeService].image} 
              alt={mainServices[activeService].title}
              className="w-full h-64 lg:h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Additional Services Grid */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="p-6 rounded-xl bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-105 border border-gray-200/50 dark:border-gray-600/50">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} shadow-lg mb-4 w-fit`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Services */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Support & Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} shadow-lg mb-4 w-fit mx-auto`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing CTA */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Inventory Management?</h2>
          <p className="text-xl text-white/90 mb-8">
            Start your free trial today and experience the power of intelligent inventory management.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105">
              Contact Sales
            </button>
          </div>
          <p className="text-white/70 text-sm mt-4">No credit card required • 30-day free trial • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

export default Services;