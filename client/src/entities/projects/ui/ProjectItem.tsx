import React from "react";
import type { ProjectT } from "../model/projectType";

type ProjectItemProps = {
  project: ProjectT;
};

function ProjectItem({ project }: ProjectItemProps): React.JSX.Element {
const handleDelete = () => {

}
  return (
    <div>
      <div>{project.title}</div>
      <div>{project.description}</div>
      <div>{project.area_m2}</div>
      <div>{project.floors}</div>
      <div>{project.material}</div>
      <div>{project.price}</div>
      надо прикрутить сюда 3д и всякое
      <button>Добавить в избранное /МОК для пользователя</button>
      <button onClick={() => handleDelete()}>Удалить /Для админа</button>
    </div>
  );
}

export default ProjectItem;
