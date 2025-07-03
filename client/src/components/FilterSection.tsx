
import React, { useState } from 'react';
import { ChevronDown, Filter, Grid3x3, Home, Square } from 'lucide-react';

const FilterSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects', count: 124 },
    { id: 'modern', label: 'Modern', count: 48 },
    { id: 'scandinavian', label: 'Scandinavian', count: 32 },
    { id: 'minimalist', label: 'Minimalist', count: 28 },
    { id: 'luxury', label: 'Luxury', count: 16 }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Explore Our <span className="font-bold">Collection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our curated selection of architectural masterpieces
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.label}
              <span className="ml-2 text-sm opacity-75">({filter.count})</span>
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="relative">
            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>Material</option>
              <option>Wood & Glass</option>
              <option>Concrete</option>
              <option>Steel & Glass</option>
              <option>Brick</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>Area (sq ft)</option>
              <option>Under 1,500</option>
              <option>1,500 - 2,500</option>
              <option>2,500 - 4,000</option>
              <option>Over 4,000</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>Floors</option>
              <option>Single Story</option>
              <option>Two Story</option>
              <option>Three Story</option>
              <option>Multi-level</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <button className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <Filter className="h-5 w-5" />
            Apply Filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
