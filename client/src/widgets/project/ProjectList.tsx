import { getAllProjectsThunk } from "@/entities/projects/model/projectThunks";
import ProjectItem from "@/entities/projects/ui/ProjectItem";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import React, { useEffect } from "react";

function ProjectList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((store) => store.project.projects);

  useEffect(() => {
    void dispatch(getAllProjectsThunk());
  }, []);
  return (
    <>
      {projects.map((project) => (
        <div key={project.id}>
          <ProjectItem project={project}></ProjectItem>
          <button>Добавить проект/Пока Мок </button>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
