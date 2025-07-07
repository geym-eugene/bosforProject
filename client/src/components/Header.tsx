import React, { FC } from "react";
import { Menu, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate("/");
    setTimeout(() => {
      const projects = document.getElementById("projects");
      projects.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              BOSFOR
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
            >
              Home
            </a>
            <button onClick={() => handleScroll()}>Catalog</button>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              AI Interior
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              3D Viewer
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
