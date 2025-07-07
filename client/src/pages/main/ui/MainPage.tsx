import Header from "../../../components/Header";
import HeroSection from "../../../components/HeroSection";
import FilterSection from "../../../components/FilterSection";
import ProjectGrid from "../../../widgets/project/ProjectGrid";
import FeatureSection from "../../../components/FeatureSection";

const MainPage = (): React.JSX.Element => {
  return (
    <>
      <HeroSection />
      <FilterSection />
      <ProjectGrid />
      <FeatureSection />
    </>
  );
};

export default MainPage;
