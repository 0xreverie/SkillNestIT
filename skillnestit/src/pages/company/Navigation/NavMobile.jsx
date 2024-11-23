import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  useDisclosure,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "../../../components/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../lib/axios";
import { setUser } from "../../../redux/actions/UserActions";

export const NavMobile = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const token = localStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const getUserData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axiosInstance.get(`/users/${userId}`, {
        headers: headers,
      });
      dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleSelect = (key) => {
    if (key === "logout") {
      setSelectedItem(key);
      setIsModalOpen(true);
    }
  };

  const confirmDeletion = () => {
    console.log("logout: ", selectedItem);
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <Navbar className="bg-primary text-white">
      <Link to="/company-dashboard">
        <p className="font-bold text-secondary text-3xl italic">SkillNestIT</p>
      </Link>
      <Dropdown placement="bottom-end" className="bg-primary text-secondary">
        <DropdownTrigger>
          <p className="p-2 text-3xl">
            <i class="fa-solid fa-bars text-secondary"></i>
          </p>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={handleSelect}
          disabledKeys={["profile"]}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <User
              name={user.name}
              description="Company"
              avatarProps={{
                src: "/assets/profile.png",
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            href="/company-dashboard"
            color="success"
          >
            <i class="fa-solid fa-house"></i> Dashboard
          </DropdownItem>
          <DropdownItem key="create" href="/company-list" color="success">
            <i class="fa-solid fa-list"></i> List
          </DropdownItem>
          <DropdownItem key="review" href="/company-review" color="success">
            <i class="fa-solid fa-eye"></i> Review
          </DropdownItem>
          <DropdownItem key="settings" onPress={onOpen} color="success">
          <i class="fa-solid fa-user"></i> Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={confirmDeletion}>
            <i class="fa-solid fa-right-to-bracket"></i> Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ProfileModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-center">
                Logout Account?
              </ModalHeader>
              <ModalFooter className="flex justify-center">
                <Button
                  className="bg-secondary text-white"
                  onPress={() => setIsModalOpen(false)}
                >
                  No
                </Button>
                <Link to="/">
                  <Button className="bg-red-500 text-white" onClick={logout}>
                    {" "}
                    Yes
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Navbar>
  );
};
