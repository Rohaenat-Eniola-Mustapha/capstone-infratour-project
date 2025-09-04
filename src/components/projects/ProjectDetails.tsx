import React, { useState } from 'react';
import { X, MapPin, Calendar, DollarSign, TrendingUp, MessageSquare, ThumbsUp, User } from 'lucide-react';
import { Project, Comment } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      project_id: project.id,
      user_id: '1',
      user: {
        id: '1',
        email: 'user@example.com',
        full_name: 'Community Member',
        role: 'community_user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      content: 'This project will greatly benefit our community. When is the expected completion date?',
      upvotes: 12,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      project_id: project.id,
      user_id: '2',
      user: {
        id: '2',
        email: 'analyst@example.com',
        full_name: 'Infrastructure Analyst',
        role: 'researcher',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      content: 'The environmental impact assessment should be prioritized. Has this been considered?',
      upvotes: 8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    const colors = {
      proposed: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-purple-100 text-purple-800 border-purple-200',
      on_hold: 'bg-orange-100 text-orange-800 border-orange-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // In a real app, this would call an API
    console.log('Adding comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
            <p className="text-gray-600 mt-1">by {project.developer.full_name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status and Progress */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="text-2xl font-bold text-green-600">{project.progress_percentage}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress_percentage}%` }}
                ></div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Community Feedback ({comments.length})
                </h3>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or ask questions about this project..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Add Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-600 text-white p-2 rounded-full">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{comment.user.full_name}</p>
                            <p className="text-sm text-gray-500">{comment.user.role.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.upvotes}</span>
                        </button>
                        <button className="text-sm text-gray-600 hover:text-green-600 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <p className="font-medium">{project.location.address}</p>
                      <p className="text-sm text-gray-600">{project.location.state}, {project.location.lga}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <p className="font-medium">₦{(project.budget / 1000000).toFixed(1)}M</p>
                      <p className="text-sm text-gray-600">Total Budget</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-green-600" />
                    <div>
                      <p className="font-medium">
                        {new Date(project.timeline_start).getFullYear()} - {new Date(project.timeline_end).getFullYear()}
                      </p>
                      <p className="text-sm text-gray-600">Project Timeline</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Contact */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Developer</h3>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{project.developer.full_name}</p>
                    <p className="text-sm text-gray-600">{project.developer.role.replace('_', ' ')}</p>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Contact Developer
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Follow Project</span>
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>View on Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};