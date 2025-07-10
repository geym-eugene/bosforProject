import React, { ChangeEvent, useEffect, useState } from "react";
import { ChevronDown, Filter, Grid3x3, Home, Square } from "lucide-react";
import ModalAdding from "@/entities/projects/ui/ModalAdding";
import {
  NewProjectT,
  ProjectsT,
  ProjectT,
} from "@/entities/projects/model/projectType";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { addProjectThunk } from "@/entities/projects/model/projectThunks";
import {
  noFilter,
  openAddModal,
  minHundred,
  setRangeFilter,
} from "@/entities/projects/model/projectSlice";
import SecondModal from "@/entities/projects/ui/SecondModal";
// import { naprimerHook } from "@/shared/custom/hooks/naprimer";

interface FilterI {
  id: string;
  label: string;
  count: number;
  doing?: () => void;
}

const FilterSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterI | null>(null);
  const dispatch = useAppDispatch();
  const rangeFilterValue = useAppSelector((state) => state.project.rangeFilter);
  // naprimerHook();

  const onRangeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRangeFilter(Number(e.target.value)));
    console.log(rangeFilterValue);
  };

  function formatMoneyShort(amount) {
    if (amount >= 1_000_000_000) {
      return (amount / 1_000_000_000).toFixed(1).replace(/\.0/, "") + "B";
    }
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(1).replace(/\.0/, "") + "M";
    }
    if (amount >= 1_000) {
      return (amount / 1_000).toFixed(1).replace(/\.0/, "") + "K";
    }
    return amount.toString();
  }

  const filters: FilterI[] = [
    {
      id: "all",
      label: "Все проекты",
      count: 0,
      doing: () => dispatch(noFilter()),
    },
    {
      id: "modern",
      label: "Площадью до 100м2",
      count: 48,
      doing: () => dispatch(minHundred()),
    },
    { id: "scandinavian", label: "Минимализм", count: 32 },
    { id: "min 100m2", label: "Сканди", count: 28 },
    { id: "luxury", label: "Хай-Тек", count: 16 },
  ];

  const doingHandler = (chosenFilter) => {
    chosenFilter?.doing();
    setActiveFilter(chosenFilter);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Ознакомьтесь с <span className="font-bold">Нашей Подборкой</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Архитектура, достойная восхищения
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => doingHandler(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter?.id === filter.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
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
              <option>Материал</option>
              <option>Сип-Панель</option>
              <option>Дерево</option>
              <option>Кирпич</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative mb-6">
            <div className="text">
              Максимальная цена {formatMoneyShort(rangeFilterValue)} ₽
            </div>
            <label htmlFor="labels-range-input" className="sr-only">
              Labels range
            </label>
            <input
              id="labels-range-input"
              type="range"
              value={rangeFilterValue}
              onChange={onRangeInputChange}
              min="10000"
              max="1000000"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
              Min (10000 ₽)
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
              Max (1000000 ₽)
            </span>
          </div>
          <div className="relative">
            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>Площадь (м2)</option>
              <option>до 1000</option>
              <option>50 - 300</option>
              <option>300 - 550</option>
              <option>более 550</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              <option>Этажность</option>
              <option>одинокая история</option>
              <option>две истории</option>
              <option>три истории</option>
              <option>мульти макси левел</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          <button className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <Filter className="h-5 w-5" />
            Применить
          </button>
          {/* ТУТ НАДО ДЛЯ АДМИНА ДОБАВЛЕНИЕ СДЕЛАТЬ, НАХУЙ ОНА ДЛЯ ВСЕХ ВИСИТ */}
          <button
            onClick={() => dispatch(openAddModal())}
            className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Добавить проект
          </button>
        </div>
      </div>
      <SecondModal />
      <ModalAdding />
    </section>
  );
};

export default FilterSection;
