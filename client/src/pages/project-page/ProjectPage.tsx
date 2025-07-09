import { getAllProjectsThunk } from "@/entities/projects/model/projectThunks";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { Download, Eye, Home, Square } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Modal3D } from "@/pages/trying3D/Modal3DPage";
import { useState } from "react";

const ProjectDetailPage: React.FC = () => {
  //Доделать страничку надо
  const { id } = useParams();
  const projectId = Number(id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getAllProjectsThunk());
  }, []);
  const projects = useAppSelector((store) => store.project.projects);
  const project = useAppSelector((store) =>
    store.project.projects.find((project) => project.id === projectId)
  );
  console.log(projects);

    const [modalOpen, setModalOpen] = useState(false);

  if (!project) return null;
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Заголовок и Картинка */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
        <p className="text-gray-500 mt-2">{project.material}</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={project.image_preview}
          alt={project.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Характеристики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <Square className="h-6 w-6 text-gray-700 mb-1" />
          <p className="font-medium">{project.area_m2} м²</p>
          <p className="text-sm text-gray-500">Площадь</p>
        </div>
        <div className="flex flex-col items-center">
          <Home className="h-6 w-6 text-gray-700 mb-1" />
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

      {/* Ссылки на файлы */}
      <div className="flex flex-wrap gap-4">
        {project.plan_pdf_url && (
          <a
            href={project.plan_pdf_url}
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4 mr-2" />
            Скачать PDF План
          </a>
        )}
        {project.model_3d_url && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            onClick={() => setModalOpen(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Открыть 3D Модель
          </button>
        )}
        <Modal3D open={modalOpen} onOpenChange={setModalOpen} />
      </div>

      {/* Кнопка редактирования
      {onEdit && (
        <div className="pt-6">
          <button
            onClick={onEdit}
            className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Редактировать проект
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProjectDetailPage;
