import React, { useState } from 'react';
import { Menu, X, Bell, User, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-600 to-yellow-500 p-2 rounded-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                InfraTour
              </h1>
              <p className="text-sm text-gray-600">Building Nigeria's Future</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-8">
              <a href="#dashboard" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Dashboard
              </a>
              <a href="#projects" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Projects
              </a>
              <a href="#community" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Community
              </a>
              <a href="#analytics" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Analytics
              </a>
            </nav>
          )}

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.full_name}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-500 border-b">
                        Role: {user.role.replace('_', ' ').toUpperCase()}
                      </div>
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              <a href="#dashboard" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                Dashboard
              </a>
              <a href="#projects" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                Projects
              </a>
              <a href="#community" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                Community
              </a>
              <a href="#analytics" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                Analytics
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};