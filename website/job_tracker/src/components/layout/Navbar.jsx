import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LogOut, Sparkles, TrendingUp, Search } from 'lucide-react';

export default function Navbar({ onLogout }) {
  const location = useLocation();

  const links = [
    { path: '/add', label: 'Add Job', icon: <Sparkles className="w-4 h-4" /> },
    { path: '/browse', label: 'Browse Jobs', icon: <Search className="w-4 h-4" /> },
    { path: '/current', label: 'Current Jobs', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#20aae4] rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobTracker</span>
            </div>
            <div className="hidden md:flex space-x-2">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 transition ${
                    location.pathname === link.path
                      ? 'bg-[#20aae4] text-white'
                      : 'text-gray-700 hover:text-white hover:bg-[#20aae4]/20'
                  }`}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 bg-[#20aae4] hover:bg-[#1d99c9] rounded-xl transition"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}
