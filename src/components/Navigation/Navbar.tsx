import React, { useState } from 'react';
import { Menu, X, User, Calendar, Home, LogOut } from 'lucide-react';
import { Link } from '../UI/Link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Calendar className="h-8 w-8 text-cyan-700" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MediBook</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className="px-3 py-2 text-gray-700 hover:text-cyan-700 transition-colors">
              Home
            </Link>
            <Link href="/doctors" className="px-3 py-2 text-gray-700 hover:text-cyan-700 transition-colors">
              Find Doctors
            </Link>
            <Link href="/appointments" className="px-3 py-2 text-gray-700 hover:text-cyan-700 transition-colors">
              My Appointments
            </Link>
            <Link href="/profile" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 transition-colors">
              <User className="h-4 w-4 mr-1" />
              Profile
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-cyan-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>
            <Link href="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-cyan-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Find Doctors
              </div>
            </Link>
            <Link href="/appointments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-cyan-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                My Appointments
              </div>
            </Link>
            <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-cyan-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile
              </div>
            </Link>
            <Link href="/logout" className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;