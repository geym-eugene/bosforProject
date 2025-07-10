import React from "react";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
          <br />
          <span className="font-bold">BOSFOR</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Современные архитектурные проекты
          <br />премиум-класса с 3D-визуализацией
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 group">
            Каталог
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
            <Play className="h-5 w-5" />
            Watch Demo
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-white opacity-50"></div>
        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
      </div> */}
    </section>
  );
};

export default HeroSection;
