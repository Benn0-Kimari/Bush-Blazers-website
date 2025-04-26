
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, isAdmin } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Bush Blazers</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/packages" className="text-gray-700 hover:text-primary transition-colors">
              Packages
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to={isAdmin ? "/admin-dashboard" : "/dashboard"}>
                    {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2">
          <div className="flex flex-col space-y-2 py-3">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/packages" className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}>
              Packages
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            
            <div className="border-t border-gray-100 pt-2 mt-2">
              {isAuthenticated ? (
                <Link
                  to={isAdmin ? "/admin-dashboard" : "/dashboard"}
                  className="w-full block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="default" className="w-full">
                    {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="w-full block mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/register" className="w-full block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
