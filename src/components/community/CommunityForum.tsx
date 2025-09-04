import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, User, Calendar, TrendingUp, Search, Filter } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  created_at: string;
  replies: number;
  upvotes: number;
  category: string;
}

export const CommunityForum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Lagos-Ibadan Expressway Progress Update Needed',
      content: 'Has anyone heard about the latest progress on the Lagos-Ibadan expressway? The last update was 3 months ago...',
      author: 'Adebayo Ogundimu',
      role: 'community_user',
      created_at: '2025-01-10T10:30:00Z',
      replies: 24,
      upvotes: 45,
      category: 'infrastructure',
    },
    {
      id: '2',
      title: 'Tourism Development in Calabar - Environmental Concerns',
      content: 'While I support tourism development, we need to ensure environmental protection measures are in place...',
      author: 'Dr. Fatima Hassan',
      role: 'researcher',
      created_at: '2025-01-09T14:20:00Z',
      replies: 18,
      upvotes: 32,
      category: 'tourism',
    },
    {
      id: '3',
      title: 'New Hospital in Kano State - Community Input Needed',
      content: 'The proposed hospital location seems to favor only certain areas. Shouldn\'t it be more centrally located?',
      author: 'Ibrahim Musa',
      role: 'community_user',
      created_at: '2025-01-08T09:15:00Z',
      replies: 31,
      upvotes: 67,
      category: 'healthcare',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'tourism', label: 'Tourism' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'environment', label: 'Environment' },
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      community_user: 'bg-blue-100 text-blue-800',
      project_developer: 'bg-green-100 text-green-800',
      government_agency: 'bg-purple-100 text-purple-800',
      researcher: 'bg-yellow-100 text-yellow-800',
      administrator: 'bg-red-100 text-red-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="h-6 w-6 mr-3 text-green-600" />
              Community Forum
            </h2>
            <p className="text-gray-600 mt-1">Engage with fellow Nigerians about infrastructure projects</p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            New Discussion
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white p-2 rounded-full">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(post.role)}`}>
                      {post.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.upvotes} upvotes</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.replies} replies</span>
                </button>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Trending</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};