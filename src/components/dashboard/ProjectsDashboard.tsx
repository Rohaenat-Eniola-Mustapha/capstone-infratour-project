import React, { useState } from 'react';
import { Plus, Filter, Search, Grid, List } from 'lucide-react';
import { Project, User } from '../../types';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectForm } from '../projects/ProjectForm';
import { ProjectDetails } from '../projects/ProjectDetails';

interface ProjectsDashboardProps {
  user: User;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in a real app, this would come from Supabase
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Lagos-Ibadan Expressway Rehabilitation',
      description: 'Complete rehabilitation of the Lagos-Ibadan expressway to improve transportation and reduce travel time between the two major cities.',
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
      title: 'Kano International Airport Expansion',
      description: 'Modernization and expansion of Kano airport to accommodate increased passenger traffic and cargo operations.',
      type: 'airport',
      location: {
        address: 'Mallam Aminu Kano International Airport',
        state: 'Kano',
        lga: 'Nassarawa',
        latitude: 12.0476,
        longitude: 8.5319,
      },
      budget: 85000000000,
      timeline_start: '2024-06-01',
      timeline_end: '2027-05-31',
      status: 'approved',
      progress_percentage: 25,
      developer_id: '2',
      developer: {
        id: '2',
        email: 'airport@example.com',
        full_name: 'Federal Airports Authority',
        role: 'project_developer',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      images: [],
      created_at: '2024-06-01T00:00:00Z',
      updated_at: '2025-01-10T00:00:00Z',
    },
    {
      id: '3',
      title: 'Olumo Rock Tourism Development',
      description: 'Enhancement of tourism infrastructure at Olumo Rock including visitor center, parking, and guided tour facilities.',
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
      developer_id: '3',
      developer: {
        id: '3',
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
  ]);

  const canCreateProjects = ['project_developer', 'government_agency'].includes(user.role);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateProject = (projectData: any) => {
    console.log('Creating project:', projectData);
    setShowProjectForm(false);
    // In a real app, this would create the project in Supabase
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects Dashboard</h2>
          <p className="text-gray-600 mt-1">Track and manage infrastructure development across Nigeria</p>
        </div>
        {canCreateProjects && (
          <button
            onClick={() => setShowProjectForm(true)}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="proposed">Proposed</option>
              <option value="approved">Approved</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>

          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg transition-colors`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg transition-colors`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={setSelectedProject}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Modals */}
      {showProjectForm && (
        <ProjectForm
          onClose={() => setShowProjectForm(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};