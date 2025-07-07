import React, { useEffect, useState } from "react";
import { NewProjectT, ProjectT } from "../model/projectType";
import { patchProjectThunk } from "../model/projectThunks";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { closeSecondModal } from "../model/projectSlice";

type Props = {
  project: ProjectT;
};

function SecondModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((store) => store.project.isSecondModalOpen);
  const projectId = useAppSelector((store) => store.project.selectedProjectId);
  const project = useAppSelector((store) =>
    store.project.projects.find((oneProject) => oneProject.id === projectId)
  );

  const [form, setForm] = useState<NewProjectT>({
    title: "",
    description: "",
    area_m2: 0,
    floors: 1,
    material: "",
    price: 0,
    image_preview: "",
    model_3d_url: "",
    plan_pdf_url: "",
  });

  useEffect(() => {
    if (isOpen && project) {
      setForm({
        title: project.title,
        description: project.description,
        area_m2: project.area_m2,
        floors: project.floors,
        material: project.material,
        price: project.price,
        image_preview: project.image_preview,
        model_3d_url: project.model_3d_url,
        plan_pdf_url: project.plan_pdf_url,
      });
    }
  }, [isOpen, project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     const validatedForm = {
      ...form,
      area_m2: Number(form.area_m2),
      floors: Number(form.floors),
      price: Number(form.price),
    };
    dispatch(patchProjectThunk({ id: projectId, data: validatedForm }));
    dispatch(closeSecondModal());
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Редактировать проект</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Название"
            onChange={handleChange}
            value={form.title}
            className="border p-2"
            required
          />
          <input
            name="material"
            placeholder="Материал"
            onChange={handleChange}
            value={form.material}
            className="border p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Описание"
            onChange={handleChange}
            value={form.description}
            className="border p-2 col-span-2"
            required
          />
          <input
            name="area_m2"
            type="number"
            placeholder="Площадь (м²)"
            onChange={handleChange}
            value={form.area_m2}
            className="border p-2"
            required
          />
          <input
            name="floors"
            type="number"
            placeholder="Этажей"
            onChange={handleChange}
            value={form.floors}
            className="border p-2"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Цена"
            onChange={handleChange}
            value={form.price}
            className="border p-2"
            required
          />
          <input
            name="image_preview"
            placeholder="Превью изображения (URL)"
            onChange={handleChange}
            value={form.image_preview}
            className="border p-2 col-span-2"
            required
          />
          <input
            name="model_3d_url"
            placeholder="3D модель (URL)"
            onChange={handleChange}
            value={form.model_3d_url}
            className="border p-2 col-span-2"
            required
          />
          <input
            name="plan_pdf_url"
            placeholder="План (PDF URL)"
            onChange={handleChange}
            value={form.plan_pdf_url}
            className="border p-2 col-span-2"
            required
          />

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => dispatch(closeSecondModal())}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              Редактировать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SecondModal;
