import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { addProject } from "../../../redux/actions/ProjectActions";
import { axiosInstance } from "../../../lib/axios";

export const CreateProject = (dispatch) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //post
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [companyname, setCompanyName] = useState("");

  const post = async () => {
    const token = localStorage.getItem("token");

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axiosInstance.post(
        "/projects",
        {
          idcompany: sessionStorage.getItem("userId"),
          companyname: companyname,
          name: name,
          description: description,
        },
        { headers: headers }
      );
      window.location.reload();

      setName("");
      setDescription("");
      setCompanyName("");
      dispatch(addProject(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-secondary text-white max-lg:hidden"
      >
        <i class="fa-solid fa-plus"></i> Create Project
      </Button>
      <Button
        onPress={onOpen}
        className="bg-secondary text-white lg:hidden"
        size="sm"
      >
        <i class="fa-solid fa-plus"></i> Create Project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center font-semibold text-4xl">
                Create Project
              </ModalHeader>
              <ModalBody>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name Project"
                  type="text"
                  required
                />
                <Input
                  value={companyname}
                  onChange={(e) => setCompanyName(e.target.value)}
                  label="Company"
                  type="text"
                  required
                />
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="Description"
                  type="text"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-secondary text-white w-full"
                  onClick={post}
                  onPress={onClose}
                >
                  <i class="fa-solid fa-floppy-disk"></i> Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
