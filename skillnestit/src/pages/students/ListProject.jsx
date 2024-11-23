import {
  Card,
  CardBody,
  Button,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pic from "../../assets/image_card.png";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { setDetailProjects } from "../../redux/actions/DetailProjectActions";

const ListProjectStudents = () => {
  const dispatch = useDispatch();
  const detailProjects = useSelector(
    (state) => state.detailProject.detailProjects
  );
  const userId = sessionStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const getStudentProjects = async () => {
    try {
      const response = await axiosInstance.get(`/student-projects/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setDetailProjects(response.data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getStudentProjects();
  }, []);

  const detailProject = detailProjects.find(
    (item) => item.id === selectedProjectId
  );

  return (
    <div className="bg-primary md:p-20 p-4">
      <h1 className="text-center text-secondary mb-7 font-bold text-3xl">
        Your Projects
      </h1>
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-primary">
        {detailProjects.map((item) => (
          <Card
            shadow="sm"
            key={item.id}
            isPressable
            onPress={() => {
              setSelectedProjectId(item.id);
              onOpen();
            }}
            className="bg-transparent border border-secondary shadow-sm shadow-gray-500"
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[210px] sm:h-[210px]"
                src={Pic}
              />
            </CardBody>
            <CardFooter className="block text-start p-4">
              <p className="text-gray-600"> {item.companyname} </p>
              <h3 className="font-bold text-lg mb-2"> {item.projectname} </h3>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {detailProject ? (
                <>
                  <ModalHeader>{detailProject.projectname}</ModalHeader>
                  <Divider />
                  <ModalBody className="py-7">
                    <Chip className="bg-secondary text-white p-2">
                      {detailProject.status}
                    </Chip>
                    <b>Link :</b>
                    <Link to="" className="italic underline bg-gray-200 p-3">
                      {detailProject.link}{" "}
                    </Link>
                    <b>Feedback :</b>
                    <p className="bg-gray-200 p-3">
                      {" "}
                      {detailProject.feedback}{" "}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="solid"
                      onPress={onClose}
                      className="bg-red-700 text-white"
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <p> Loading... </p>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ListProjectStudents;
