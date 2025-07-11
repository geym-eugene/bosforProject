import {addImagesThunk, getAllProjectsThunk} from "@/entities/projects/model/projectThunks";
import {useAppDispatch, useAppSelector} from "@/shared/library/hooks";
import {ChevronLeft, ChevronRight, Eye, Home, Square} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Modal3D} from "@/pages/trying3D/Modal3DPage";

const ProjectDetailPage: React.FC = () => {
    const {id} = useParams();
    const projectId = Number(id);
    const dispatch = useAppDispatch();
    const role = useAppSelector(store => store.user.user?.role)

    useEffect(() => {
        void dispatch(getAllProjectsThunk());
    }, [dispatch]);

    const projects = useAppSelector((store) => store.project.projects);
    const project = useAppSelector((store) =>
        store.project.projects.find((project) => project.id === projectId)
    );

    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!project) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? project.images.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === project.images.length - 1 ? 0 : prev + 1
        );
    };

    const submitHandle = (e) => {
        e.preventDefault();
        const inputData = new FormData(e.currentTarget);
        dispatch(addImagesThunk({projectID: project.id, formData: inputData}))
    }


    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Заголовок и описание материала */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-gray-500 mt-2">{project.material}</p>
            </div>

            {/* Слайдер изображений */}
            <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-md">
                {project.images &&

                    <img
                        src={project.images[currentIndex]?.url}
                        alt={'Картинка проекта'}
                        className="w-full h-full object-cover transition-all duration-300"
                    />
                }
                {/* Стрелки навигации */}
                {project.images?.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-800"/>
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-800"/>
                        </button>
                    </>
                )}

                {/* Индикаторы (точки) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images?.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full transition ${
                                i === currentIndex ? "bg-white" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Характеристики */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                    <Square className="h-6 w-6 text-gray-700 mb-1"/>
                    <p className="font-medium">{project.area_m2} м²</p>
                    <p className="text-sm text-gray-500">Площадь</p>
                </div>
                <div className="flex flex-col items-center">
                    <Home className="h-6 w-6 text-gray-700 mb-1"/>
                    <p className="font-medium">{project.floors}</p>
                    <p className="text-sm text-gray-500">Этажей</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-gray-900">
                        {project.price.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-gray-500">Цена</p>
                </div>
            </div>

            {/* Описание */}
            {role === 'admin' && <form
                onSubmit={submitHandle}
                className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-6"
            >
                <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-64 h-36 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition shrink-0"
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <svg
                            aria-hidden="true"
                            className="w-6 h-6 mb-1 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16V4m0 0L3.5 7.5M7 4l3.5 3.5M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2h-4m-4 0H5a2 2 0 01-2-2v-5a2 2 0 012-2h2"
                            />
                        </svg>
                        <p className="text-xs text-gray-500">
                            <span className="font-semibold">Выбрать файл</span><br/>
                            или перетащить сюда
                        </p>
                    </div>
                    <input
                        id="file-upload"
                        name="file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        required
                    />
                </label>

                <div className="flex-1 space-y-3">
                    <p className="text-gray-700 text-sm">
                        Поддерживаются изображения в форматах <strong>JPG</strong>, <strong>PNG</strong> до 5MB.
                    </p>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                    >
                        Отправить
                    </button>
                </div>
            </form>}


            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Описание</h2>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-4">
                {/* 3D модель */}
                {project.model_3d_url && (
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
                        onClick={() => setModalOpen(true)}
                    >
                        <Eye className="h-4 w-4 mr-2"/>
                        Открыть 3D Модель
                    </button>
                )}

                <Modal3D open={modalOpen} onOpenChange={setModalOpen}/>
            </div>
        </div>
    );
};

export default ProjectDetailPage;