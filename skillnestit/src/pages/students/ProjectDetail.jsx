import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, CardBody, Divider, Button, Spinner } from "@nextui-org/react";
import { axiosInstance } from "../../lib/axios";
import { addDetailProject } from "../../redux/actions/DetailProjectActions";
import { setProjects } from "../../redux/actions/ProjectActions";
import { toast } from "sonner";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.id == id);

  const studentId = sessionStorage.getItem("userId");
  const [link, setLink] = useState("");

  // Pastikan pengguna sudah login, jika tidak arahkan ke login
  useEffect(() => {
    if (!studentId) {
      navigate("/login");
    }
  }, [studentId, navigate]);

  const getProjectsData = async () => {
    if (!projects.length) {
      try {
        const response = await axiosInstance.get("/projects");
        dispatch(setProjects(response.data));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/projectdetails", {
        idproject: id,
        idstudent: studentId,
        link: link,
      });

      dispatch(addDetailProject(response.data));
      toast.success('Project Submited Successfully!')
      navigate("/students/projects");
    } catch (error) {
      console.error("Error submitting project:", error);
      toast.error("Failed to Submit Project!");
    }
  };

  useEffect(() => {
    getProjectsData();
  }, [projects]);

  return (
    <div className="bg-primary min-h-screen p-20 max-lg:p-1">
      {project ? (
        <>
          <div className="w-[60%] mx-auto bg-white p-6 rounded-xl shadow-lg mt-10 max-lg:w-[95%] text-center">
            <h2 className="text-4xl font-semibold text-center text-black mb-4">{project.name}</h2>
            <div className="text-lg text-black mb-5">
              <p>{project.description}</p>
            </div>
          </div>

          <Card className="w-[60%] mx-auto mt-10 p-6 shadow-xl rounded-xl bg-white  max-lg:w-[95%]">
            <CardBody>
              <p className="text-center mb-7 text-black text-2xl font-semibold">
                Submit Your Project Link Here
              </p>
              <form onSubmit={handleSubmit} className="w-[90%] mx-auto space-y-5">
                <label className="text-black block font-semibold">Project Link:</label>
                <input
                  type="text"
                  className="w-full p-3 text-black rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                  placeholder="(github, gitlab, etc.)"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <Button
                  className="w-full mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Submit
                </Button>
                <Link to='/projects'>
                <Button
                  className="w-full mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
                >
                  Close
                </Button>
                </Link>
              </form>
            </CardBody>
          </Card>
        </>
      ) : (
        <Spinner size="lg"/>
      )}
    </div>
  );
};

export default ProjectDetail;
