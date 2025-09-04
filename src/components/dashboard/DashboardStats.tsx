import React from 'react';
import { TrendingUp, Users, MapPin, Calendar, Target, CheckCircle } from 'lucide-react';
import { User, Project } from '../../types';

interface DashboardStatsProps {
  user: User;
  projects: Project[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ user, projects }) => {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
  const averageProgress = projects.reduce((sum, p) => sum + p.progress_percentage, 0) / totalProjects || 0;

  const getStatsForRole = () => {
    switch (user.role) {
      case 'project_developer':
        return [
          { label: 'Active Projects', value: inProgressProjects, icon: MapPin, color: 'bg-blue-500' },
          { label: 'Completed Projects', value: completedProjects, icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Average Progress', value: `${Math.round(averageProgress)}%`, icon: Target, color: 'bg-yellow-500' },
          { label: 'Community Engagement', value: '847', icon: Users, color: 'bg-purple-500' },
        ];
      case 'government_agency':
        return [
          { label: 'Projects to Review', value: '12', icon: Calendar, color: 'bg-orange-500' },
          { label: 'Approved Projects', value: completedProjects + inProgressProjects, icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Total Budget Allocated', value: '₦2.4B', icon: TrendingUp, color: 'bg-blue-500' },
          { label: 'Active Locations', value: '23', icon: MapPin, color: 'bg-purple-500' },
        ];
      case 'administrator':
        return [
          { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-green-500' },
          { label: 'Active Projects', value: totalProjects, icon: MapPin, color: 'bg-blue-500' },
          { label: 'System Health', value: '99.9%', icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Monthly Growth', value: '+15%', icon: TrendingUp, color: 'bg-yellow-500' },
        ];
      case 'researcher':
        return [
          { label: 'Data Points', value: '45K', icon: Target, color: 'bg-purple-500' },
          { label: 'Reports Generated', value: '87', icon: TrendingUp, color: 'bg-blue-500' },
          { label: 'Insights Discovered', value: '23', icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Active Research', value: '5', icon: Calendar, color: 'bg-orange-500' },
        ];
      default: // community_user
        return [
          { label: 'Projects Followed', value: '8', icon: MapPin, color: 'bg-blue-500' },
          { label: 'Comments Made', value: '24', icon: Users, color: 'bg-green-500' },
          { label: 'Feedback Score', value: '4.8', icon: Target, color: 'bg-yellow-500' },
          { label: 'Projects Proposed', value: '3', icon: TrendingUp, color: 'bg-purple-500' },
        ];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};