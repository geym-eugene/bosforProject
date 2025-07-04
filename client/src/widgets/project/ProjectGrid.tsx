import React, { useEffect } from "react";
import ProjectCard from "../../entities/projects/ui/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { getAllProjectsThunk } from "@/entities/projects/model/projectThunks";

const ProjectGrid = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((store) => store.project.projects);

  useEffect(() => {
    void dispatch(getAllProjectsThunk());
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;



//ТУТ КАКОЙТО ФИЧУРЕД ЕСТЬ
// const projecto = [
//     {
//       id: 1,
//       title: "Nordic Harmony",
//       style: "Scandinavian Modern",
//       area: "2,450 sq ft",
//       floors: 2,
//       price: "$89,900",
//       image:
//         "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       featured: true, 
//     },
//     {
//       id: 2,
//       title: "Glass Pavilion",
//       style: "Contemporary",
//       area: "3,200 sq ft",
//       floors: 2,
//       price: "$124,900",
//       image:
//         "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       featured: false,
//     },
//     {
//       id: 3,
//       title: "Minimalist Cube",
//       style: "Modern Minimalist",
//       area: "1,850 sq ft",
//       floors: 2,
//       price: "$67,500",
//       image:
//         "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       featured: false,
//     },
//     {
//       id: 4,
//       title: "Timber Frame",
//       style: "Scandinavian",
//       area: "2,890 sq ft",
//       floors: 2,
//       price: "$98,700",
//       image:
//         "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       featured: false,
//     },
//     {
//       id: 5,
//       title: "Urban Loft",
//       style: "Industrial Modern",
//       area: "4,100 sq ft",
//       floors: 3,
//       price: "$156,800",
//       image:
//         "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       featured: false,
//     },
//     {
//       id: 6,
//       title: "Garden House",
//       style: "Contemporary",
//       area: "2,200 sq ft",
//       floors: 1,
//       price: "$78,900",
//       image:
//         "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       featured: false,
//     },
//   ];
