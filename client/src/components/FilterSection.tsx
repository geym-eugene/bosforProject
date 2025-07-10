import React, {ChangeEvent, useState} from "react";
import {ChevronDown, Filter} from "lucide-react";
import ModalAdding from "@/entities/projects/ui/ModalAdding";
import {useAppDispatch, useAppSelector} from "@/shared/library/hooks";
import {
    minHundred,
    noFilter,
    openAddModal,
    setAreaFilter,
    setFloorFilter,
    setMaterialFilter,
    setRangeFilter,
    setStyleFilter,
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

    const role = useAppSelector(store => store.user.user?.role)

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
        {id: "scandinavian", label: "Минимализм", count: 32, doing: () => dispatch(setStyleFilter("минимализм"))},
        {id: "min 100m2", label: "Сканди", count: 28, doing: () => dispatch(setStyleFilter("сканди"))},
        {id: "luxury", label: "Хай-Тек", count: 16, doing: () => dispatch(setStyleFilter("хай-тек"))},
    ];

    const doingHandler = (chosenFilter) => {
        chosenFilter?.doing();
        setActiveFilter(chosenFilter);
    };

    const doingHandlerSelect = (chosenFilter) => {
        dispatch(setMaterialFilter(chosenFilter));
    };

    const doingHandlerSelectArea = (chosenFilter) => {
        dispatch(setAreaFilter(JSON.parse(chosenFilter)))
    }

    const doingHandlerSelectFloor = (chosenFilter) => {
        dispatch(setFloorFilter(Number(chosenFilter)));
    }


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
                        <select onChange={(e) => doingHandlerSelect(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
                            <option value="" disabled selected hidden>
                                Материал
                            </option>
                            <option value="">Любой</option>
                            <option value={'Сип-Панель'}>Сип-Панель</option>
                            <option value={'дерево'}>Дерево</option>
                            <option value={'Кирпич'}>Кирпич</option>
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"/>
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
                        <select onChange={(e) => doingHandlerSelectArea(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
                            <option disabled selected hidden>Площадь (м2)</option>
                            <option value={JSON.stringify({min: 0, max: 100000})}>Любой</option>
                            <option value={JSON.stringify({min: 0, max: 1000})}>до 1000</option>
                            <option value={JSON.stringify({min: 50, max: 300})}>50 - 300</option>
                            <option value={JSON.stringify({min: 300, max: 550})}>300 - 550</option>
                            <option value={JSON.stringify({min: 550, max: 100000})}>более 550</option>
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"/>
                    </div>

                    <div className="relative">
                        <select onChange={(e) => doingHandlerSelectFloor(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent">
                            <option disabled selected hidden>Этажность</option>
                            <option value={1}>одинокая история</option>
                            <option value={2}>две истории</option>
                            <option value={3}>три истории</option>
                            <option value={5}>мульти макси левел</option>
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"/>
                    </div>

                    <button
                        className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <Filter className="h-5 w-5"/>
                        Применить
                    </button>
                    {role === 'admin' && <button
                        onClick={() => dispatch(openAddModal())}
                        className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        Добавить проект
                    </button>}
                </div>
            </div>
            <SecondModal/>
            <ModalAdding/>
        </section>
    );
};

export default FilterSection;
