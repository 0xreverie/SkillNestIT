import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

export const Review = ({ item, giveFeedback }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
const [formData, setFormData] = useState(item?.feedback || "")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!item || !item.id) {
        console.error("Invalid item or missing ID");
        return;
      }

      // Kirim data feedback ke backend
      await giveFeedback(item.id, formData);
      console.log(formData);
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-secondary text-white max-lg:hidden"
      >
        <i class="fa-solid fa-eye"></i> Review
      </Button>
      <Button
        onPress={onOpen}
        className="text-secondary lg:hidden"
        size="sm"
        isIconOnly
        variant="light"
        color="success"
      >
        <i class="fa-solid fa-eye"></i>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col items-center font-semibold text-4xl">
                Review
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <Textarea
                    label="Notes: "
                    type="text"
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                  />
                  <Button
                    className="bg-secondary text-white w-full"
                    type="submit"
                  >
                    <i class="fa-solid fa-floppy-disk"></i> Save
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
