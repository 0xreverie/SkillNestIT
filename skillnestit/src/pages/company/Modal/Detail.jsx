import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

export const Detail = ({ item }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData] = useState({
    idcompany: sessionStorage.getItem("userId"),
    name: item.name,
    description: item.description,
  });

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-sky-600 text-white max-lg:hidden"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>Detail
      </Button>
      <Button
        onPress={onOpen}
        className="text-sky-600 lg:hidden"
        size="sm"
        isIconOnly
        variant="light"
        color="success"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col items-center font-semibold text-4xl">
              <Input
                label="Name"
                type="text"
                size="sm"
                value={formData.name}
                isReadOnly
                variant="underlined"
              />
            </ModalHeader>
            <ModalBody>
              <Textarea
                label="Description "
                type="text"
                value={formData.description}
                isReadOnly
                variant="underlined"
                size="lg"
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
