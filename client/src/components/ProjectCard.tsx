
import React from 'react';
import { Eye, Heart, Download, Square, Home } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  style: string;
  area: string;
  floors: number;
  price: string;
  image: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Download className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {/* 3D View Button */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-4 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Eye className="h-4 w-4" />
            3D View
          </button>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
            <p className="text-gray-600 text-sm">{project.style}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{project.price}</p>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{project.area}</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>{project.floors} Floors</span>
          </div>
        </div>

        {/* AI Interior Button */}
        <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Generate AI Interior
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
