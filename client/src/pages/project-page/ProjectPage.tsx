import {getAllProjectsThunk} from "@/entities/projects/model/projectThunks";
import {useAppDispatch, useAppSelector} from "@/shared/library/hooks";
import {ChevronLeft, ChevronRight, Eye, Home, Square} from "lucide-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Modal3D} from "@/pages/trying3D/Modal3DPage";

const ProjectDetailPage: React.FC = () => {
    const {id} = useParams();
    const projectId = Number(id);
    const dispatch = useAppDispatch();

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