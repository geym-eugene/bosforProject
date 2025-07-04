import Header from "../../../components/Header";
import HeroSection from "../../../components/HeroSection";
import FilterSection from "../../../components/FilterSection";
import ProjectGrid from "../../../components/ProjectGrid";
import FeatureSection from "../../../components/FeatureSection";
import ProjectList from "@/widgets/project/ProjectList";

const MainPage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FilterSection />
      <ProjectGrid />
      <ProjectList />
      <FeatureSection />
    </div>
  );
};

export default MainPage;
