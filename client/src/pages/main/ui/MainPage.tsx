import Header from "../../../components/Header";
import HeroSection from "../../../components/HeroSection";
import FilterSection from "../../../components/FilterSection";
import ProjectGrid from "../../../components/ProjectGrid";
import FeatureSection from "../../../components/FeatureSection";

const MainPage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FilterSection />
      <ProjectGrid />
      <FeatureSection />
    </div>
  );
};

export default MainPage;
