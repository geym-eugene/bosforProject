import Header from "../../../components/Header";
import HeroSection from "../../../components/HeroSection";
import FilterSection from "../../../components/FilterSection";
import ProjectGrid from "../../../widgets/project/ProjectGrid";
import FeatureSection from "../../../components/FeatureSection";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { dontShow, showPage } from "@/entities/projects/model/projectSlice";
import { useState } from "react";

const MainPage = (): React.JSX.Element => {
  const showAllProjects = useAppSelector((store) => store.project.showProjectState);
  const dispatch = useAppDispatch();

  return (
    <>
      <HeroSection />
      <FilterSection />
      <ProjectGrid />
     {showAllProjects && <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => setTimeout(() => dispatch(showPage()), 100)}
          style={{
            display: "flex",
            width: "80vh",
            justifyContent: "center",
            marginBottom: "20px",
          }}
          className="py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Все проекты
        </button>
      </div>}
      <FeatureSection />
    </>
  );
};

export default MainPage;
