import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, Calendar, Bell, Filter } from 'lucide-react';
import { User, Project } from '../../types';
import { DashboardStats } from './DashboardStats';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectDetails } from '../projects/ProjectDetails';

interface MainDashboardProps {
  user: User;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ user }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mock data - in a real app, this would come from Supabase
  const recentProjects: Project[] = [
    {
      id: '1',
      title: 'Lagos-Ibadan Expressway Rehabilitation',
      description: 'Complete rehabilitation of the Lagos-Ibadan expressway to improve transportation.',
      type: 'road',
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
      status: 'in_progress',
      progress_percentage: 65,
      developer_id: '1',
      developer: {
        id: '1',
        email: 'developer@example.com',
        full_name: 'Federal Roads Maintenance Agency',
        role: 'project_developer',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      images: [],
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
    },
    {
      id: '2',
      title: 'Olumo Rock Tourism Development',
      description: 'Enhancement of tourism infrastructure at Olumo Rock.',
      type: 'tourism_site',
      location: {
        address: 'Olumo Rock, Abeokuta',
        state: 'Ogun',
        lga: 'Abeokuta South',
        latitude: 7.1475,
        longitude: 3.3619,
      },
      budget: 12000000000,
      timeline_start: '2024-09-01',
      timeline_end: '2025-08-31',
      status: 'completed',
      progress_percentage: 100,
      developer_id: '2',
      developer: {
        id: '2',
        email: 'tourism@example.com',
        full_name: 'Ogun State Tourism Board',
        role: 'project_developer',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      images: [],
      created_at: '2024-09-01T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'project_update',
      title: 'Lagos-Ibadan Expressway',
      description: 'Milestone completed: Bridge construction phase finished',
      timestamp: '2 hours ago',
      icon: TrendingUp,
    },
    {
      id: '2',
      type: 'community_feedback',
      title: 'New comment on Kano Hospital',
      description: 'Community member suggested additional parking facilities',
      timestamp: '5 hours ago',
      icon: Users,
    },
    {
      id: '3',
      type: 'project_approved',
      title: 'Abuja Water Supply Project',
      description: 'Government agency approved budget allocation',
      timestamp: '1 day ago',
      icon: Calendar,
    },
  ];

  const getDashboardTitle = () => {
    const titles = {
      community_user: 'Community Dashboard',
      project_developer: 'Developer Dashboard',
      government_agency: 'Agency Dashboard',
      administrator: 'Admin Dashboard',
      researcher: 'Research Dashboard',
    };
    return titles[user.role] || 'Dashboard';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-xl text-white p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.full_name}!</h1>
          <p className="text-green-100 text-lg">
            {user.role === 'community_user' && "Track projects in your area and engage with the development community."}
            {user.role === 'project_developer' && "Manage your projects and engage with community feedback."}
            {user.role === 'government_agency' && "Monitor project compliance and review proposals."}
            {user.role === 'administrator' && "Oversee platform operations and user management."}
            {user.role === 'researcher' && "Analyze community engagement and project impact data."}
          </p>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats user={user} projects={recentProjects} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-green-600" />
                Latest Updates
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <IconComponent className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};