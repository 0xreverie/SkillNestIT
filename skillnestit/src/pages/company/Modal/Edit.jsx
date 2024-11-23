import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Input,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { editCompanyProject } from "../../../services/editCompanyProject";

export const EditProject = ({ item }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    idcompany: sessionStorage.getItem("userId"),
    companyname: item.companyname,
    name: item.name,
    description: item.description,
  });

  const handleUpdate = () => {
    dispatch(editCompanyProject(item.id, formData));
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-secondary text-white max-lg:hidden"
      >
        <i class="fa-solid fa-pen"></i>Edit
      </Button>
      <Button
        onPress={onOpen}
        className="text-secondary lg:hidden"
        size="sm"
        isIconOnly
        variant="light"
        color="success"
      >
        <i class="fa-solid fa-pen"></i>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col items-center font-semibold text-4xl">
                Edit Project
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  type="text"
                  size="sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  label="Company"
                  type="text"
                  size="sm"
                  value={formData.companyname}
                  onChange={(e) =>
                    setFormData({ ...formData, companyname: e.target.value })
                  }
                />
                <Textarea
                  label="Description "
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-secondary text-white w-full"
                  onClick={handleUpdate}
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
