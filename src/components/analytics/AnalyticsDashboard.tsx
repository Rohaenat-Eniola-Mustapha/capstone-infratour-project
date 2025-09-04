import React from 'react';
import { BarChart3, TrendingUp, Users, MapPin, Calendar, Target } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const analyticsData = {
    totalProjects: 247,
    activeProjects: 156,
    completedProjects: 91,
    totalBudget: 2400000000000,
    communityEngagement: 1234,
    averageCompletionTime: 18,
    stateParticipation: [
      { state: 'Lagos', projects: 45, completion: 78 },
      { state: 'Kano', projects: 32, completion: 65 },
      { state: 'Rivers', projects: 28, completion: 82 },
      { state: 'FCT', projects: 25, completion: 74 },
      { state: 'Ogun', projects: 22, completion: 88 },
    ],
    projectTypes: [
      { type: 'Roads', count: 89, budget: 890000000000 },
      { type: 'Healthcare', count: 45, budget: 450000000000 },
      { type: 'Education', count: 38, budget: 380000000000 },
      { type: 'Tourism', count: 25, budget: 250000000000 },
      { type: 'Others', count: 50, budget: 430000000000 },
    ],
    monthlyTrends: [
      { month: 'Jan', projects: 15, engagement: 234 },
      { month: 'Feb', projects: 22, engagement: 289 },
      { month: 'Mar', projects: 18, engagement: 312 },
      { month: 'Apr', projects: 25, engagement: 378 },
      { month: 'May', projects: 28, engagement: 445 },
      { month: 'Jun', projects: 32, engagement: 523 },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h2>
        <p className="text-gray-600">Comprehensive data on Nigeria's infrastructure development</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.totalProjects}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.activeProjects}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Community Users</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.communityEngagement.toLocaleString()}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Investment</p>
              <p className="text-3xl font-bold text-gray-900">₦{(analyticsData.totalBudget / 1000000000000).toFixed(1)}T</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* State Participation */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-green-600" />
            Top Participating States
          </h3>
          
          <div className="space-y-4">
            {analyticsData.stateParticipation.map((state, index) => (
              <div key={state.state} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{state.state} State</p>
                    <p className="text-sm text-gray-600">{state.projects} active projects</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{state.completion}%</p>
                  <p className="text-xs text-gray-500">completion rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Types Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Project Types Distribution
          </h3>
          
          <div className="space-y-4">
            {analyticsData.projectTypes.map((type, index) => {
              const percentage = (type.count / analyticsData.totalProjects) * 100;
              return (
                <div key={type.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{type.type}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{type.count}</span>
                      <span className="text-xs text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Budget: ₦{(type.budget / 1000000000).toFixed(1)}B
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-green-600" />
          Monthly Trends (2024)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {analyticsData.monthlyTrends.map((month) => (
            <div key={month.month} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">{month.month}</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{month.projects}</p>
              <p className="text-xs text-gray-500">projects</p>
              <p className="text-sm font-medium text-blue-600 mt-2">{month.engagement}</p>
              <p className="text-xs text-gray-500">engagement</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-xl text-white p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Community Impact</h3>
          <p className="text-green-100 mb-6">Real change happening across Nigeria</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">5.2M</p>
              <p className="text-green-100">People Benefited</p>
            </div>
            <div>
              <p className="text-3xl font-bold">234</p>
              <p className="text-green-100">Communities Reached</p>
            </div>
            <div>
              <p className="text-3xl font-bold">18</p>
              <p className="text-green-100">Months Avg Completion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};