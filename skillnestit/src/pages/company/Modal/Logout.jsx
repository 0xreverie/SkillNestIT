import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

export const Logout = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <div>
      <Button className="bg-red-500 text-white" onPress={onOpen}>
        <i class="fa-solid fa-right-to-bracket"></i> Log Out
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                Logout Account?
              </ModalHeader>
              <ModalFooter className="flex justify-center">
                <Button className="bg-red-500 text-white" onPress={onClose}>
                  No
                </Button>
                <Link to='/'><Button className=" bg-secondary text-white" onClick={logout}>Yes
                </Button>
                 </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
