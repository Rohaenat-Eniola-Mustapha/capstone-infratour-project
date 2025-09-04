import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { AuthForm } from './components/auth/AuthForm';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { ProjectsDashboard } from './components/dashboard/ProjectsDashboard';
import { CommunityForum } from './components/community/CommunityForum';
import { ProjectMap } from './components/map/ProjectMap';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { BarChart3, MessageSquare, MapPin, Home } from 'lucide-react';

function AppContent() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  // Mock projects for map
  const mockProjects = [
    {
      id: '1',
      title: 'Lagos-Ibadan Expressway Rehabilitation',
      description: 'Complete rehabilitation of the Lagos-Ibadan expressway.',
      type: 'road' as const,
      location: {
        address: 'Lagos-Ibadan Expressway',
        state: 'Lagos',
        lga: 'Ikorodu',
        latitude: 6.5244,
        longitude: 3.3792,
      },
      budget: 150000000000,
      timeline_start: '2024-01-01',
      timeline_end: '2026-12-31',
      status: 'in_progress' as const,
      progress_percentage: 65,
      developer_id: '1',
      developer: {
        id: '1',
        email: 'developer@example.com',
        full_name: 'Federal Roads Maintenance Agency',
        role: 'project_developer' as const,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      images: [],
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading InfraTour...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />;
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: MapPin },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'map', label: 'Map View', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'projects':
        return <ProjectsDashboard user={user} />;
      case 'community':
        return <CommunityForum />;
      case 'map':
        return <ProjectMap projects={mockProjects} onProjectSelect={() => {}} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <MainDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentView === item.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;