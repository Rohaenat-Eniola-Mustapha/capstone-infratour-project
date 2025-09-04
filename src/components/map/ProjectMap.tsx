import React, { useState } from 'react';
import { MapPin, Filter, Search, Navigation } from 'lucide-react';
import { Project } from '../../types';

interface ProjectMapProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export const ProjectMap: React.FC<ProjectMapProps> = ({ projects, onProjectSelect }) => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const projectTypes = [
    { value: 'road', label: 'Roads' },
    { value: 'hospital', label: 'Healthcare' },
    { value: 'school', label: 'Education' },
    { value: 'tourism_site', label: 'Tourism' },
    { value: 'bridge', label: 'Bridges' },
    { value: 'airport', label: 'Airports' },
    { value: 'water_supply', label: 'Water Supply' },
    { value: 'power_plant', label: 'Power' },
    { value: 'housing', label: 'Housing' },
  ];

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

  const getStatusColor = (status: string) => {
    const colors = {
      proposed: 'bg-yellow-500',
      approved: 'bg-blue-500',
      in_progress: 'bg-green-500',
      completed: 'bg-purple-500',
      on_hold: 'bg-orange-500',
      cancelled: 'bg-red-500',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const filteredProjects = projects.filter(project => {
    const matchesState = selectedState === 'all' || project.location.state === selectedState;
    const matchesType = selectedType === 'all' || project.type === selectedType;
    return matchesState && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
          <MapPin className="h-6 w-6 mr-3 text-green-600" />
          Project Locations
        </h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All States</option>
              {nigerianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {projectTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[600px] relative overflow-hidden">
            {/* Map Header */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Nigeria Infrastructure Map</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Navigation className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Background */}
            <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-4">Google Maps integration will display project locations</p>
                <div className="text-sm text-gray-500">
                  {filteredProjects.length} projects shown • API integration required
                </div>
              </div>
            </div>

            {/* Map Markers Simulation */}
            <div className="absolute inset-0 pointer-events-none">
              {filteredProjects.slice(0, 6).map((project, index) => (
                <div
                  key={project.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${30 + Math.floor(index / 3) * 25}%`,
                  }}
                >
                  <button
                    onClick={() => onProjectSelect(project)}
                    className="group relative"
                  >
                    <div className={`w-8 h-8 ${getStatusColor(project.status)} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                      <span className="text-white text-lg">{getTypeIcon(project.type)}</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap">
                      <p className="text-sm font-medium">{project.title}</p>
                      <p className="text-xs text-gray-600">{project.location.state}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Status Legend</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">In Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Projects on Map</h3>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md cursor-pointer transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${getStatusColor(project.status)} rounded-full flex items-center justify-center text-white`}>
                    <span>{getTypeIcon(project.type)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600">{project.location.state}, {project.location.lga}</p>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>Progress: {project.progress_percentage}%</span>
                      <span>₦{(project.budget / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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