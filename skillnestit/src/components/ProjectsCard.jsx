import { useEffect, useState, useMemo } from "react";
import { Card, CardBody, CardFooter, Pagination, Image } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pic from "../assets/image_card.png";
import { setProjects } from "../redux/actions/ProjectActions";
import { axiosInstance } from "../lib/axios";

const ProjectsCard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const navigate = useNavigate();

  const getProjectsData = async () => {
    try {
      const response = await axiosInstance.get("/projects");
      dispatch(setProjects(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProjectClick = (id) => {
    const userId = sessionStorage.getItem("userId");  // Cek jika user sudah login

    if (!userId) {
      // Jika belum login, arahkan ke halaman login
      navigate("/login");
    } else {
      // Jika sudah login, lanjutkan ke halaman detail proyek
      navigate(`/projects/${id}`);
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(projects.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return projects.slice(start, end);
  }, [page, projects]);

  return (
    <>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-primary">
        {items.map((item) => (
          <Card
            shadow="sm"
            key={item.id}
            isPressable
            onPress={() => handleProjectClick(item.id)}
            className="bg-transparent border border-secondary shadow-md w-full max-w-[300px] mx-auto"
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[180px] sm:h-[280px]"
                src={Pic}
              />
            </CardBody>
            <CardFooter className="block text-start p-4">
              <p className="text-gray-600 text-sm">{item.companyname}</p>
              <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </>
  );
};

export default ProjectsCard;
