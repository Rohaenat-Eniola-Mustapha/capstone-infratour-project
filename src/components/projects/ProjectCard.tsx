import React from 'react';
import { Calendar, MapPin, DollarSign, TrendingUp, MessageSquare, Users } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      proposed: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-green-100 text-green-800',
      completed: 'bg-purple-100 text-purple-800',
      on_hold: 'bg-orange-100 text-orange-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      road: '🛣️',
      hospital: '🏥',
      school: '🏫',
      tourism_site: '🏛️',
      bridge: '🌉',
      airport: '✈️',
      water_supply: '💧',
      power_plant: '⚡',
      housing: '🏘️',
    };
    return icons[type as keyof typeof icons] || '🏗️';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getTypeIcon(project.type)}</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-600">by {project.developer.full_name}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-bold text-green-600">{project.progress_percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${project.progress_percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{project.location.state}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          <span>₦{(project.budget / 1000000).toFixed(1)}M</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{new Date(project.timeline_end).getFullYear()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MessageSquare className="h-4 w-4 mr-2" />
          <span>24 comments</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(project)}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-105"
      >
        View Details
      </button>
    </div>
  );
};