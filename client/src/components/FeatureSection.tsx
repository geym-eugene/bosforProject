
import React from 'react';
import { Cpu, Eye, Palette, Shield } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Eye,
      title: '3D Визаулизация',
      description: 'Погрузитесь в атмосферу своего будущего дома через реалистичную 3D-визуализацию',
      color: 'text-blue-600'
    },
    {
      icon: Cpu,
      title: 'Функциональные планировки',
      description: 'Рациональная организация пространства обеспечивает комфорт, эргономику и гибкость под любые потребности',
      color: 'text-purple-600'
    },
    {
      icon: Palette,
      title: 'Современный взгляд',
      description: 'Дизайны соответствуют последним архитектурным трендам и подчёркивают индивидуальность вашего дома',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Гарантированное качество: все планы соответствуют профессиональным стандартам и строительным требованиям',
      color: 'text-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Почему <span className="font-bold">BOSFOR</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы объединяем классическую архитектуру с современными технологиями
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300 mb-6">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              Готовы Построить <span className="font-bold">Свою Мечту?</span>
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам довольных клиентов, воплотивших свои идеи в жизнь вместе с BOSFOR
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Получить консультацию
              </button>
              {/* <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                Получить Консультацию
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
