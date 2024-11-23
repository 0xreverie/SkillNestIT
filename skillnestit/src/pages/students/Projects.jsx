// import { Button, Input } from "@nextui-org/react";
import ProjectsCard from "../../components/ProjectsCard";

const Projects = () => {
  return (
    <div className="min-h-screen bg-primary p-8 sm:p-20 max-md:p-4">
      <h1 className="font-bold text-3xl text-center text-secondary mb-12 sm:mb-16 max-md:text-xl max-md:mb-6">
        Browse Projects from Various Companies
      </h1>

      <ProjectsCard />
    </div>
  );
};

export default Projects;
