import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "../assets/profile.png";
import { axiosInstance } from "../lib/axios";
import { setUser, updateUser } from "../redux/actions/UserActions";
import { toast } from "sonner";

const ProfileModal = ({ isOpen, onOpenChange }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const token = localStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telp: "",
  });

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
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        telp: user.telp || "",
      });
    }
  }, [user]);

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axiosInstance.put(
        `/edit-user/${userId}`,
        formData,
        {
          headers: headers,
        }
      );

      dispatch(updateUser(response.data));
      toast.success("User data updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update user data. Please try again later.");
      console.error("Failed to update user:", error.response?.data || error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-primary">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Profile</ModalHeader>
            <ModalBody>
              <div className="mx-auto">
                <Image src={ProfilePic} className="w-32 border border-black" />
              </div>

              <form onSubmit={handleEdit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-semibold">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="telp" className="font-semibold">
                    Phone Number
                  </label>
                  <Input
                    id="telp"
                    name="telp"
                    value={formData.telp}
                    onChange={(e) =>
                      setFormData({ ...formData, telp: e.target.value })
                    }
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex gap-4 justify-end">
                  <Button type="submit" className="bg-secondary text-white">
                    Save
                  </Button>
                  <Button onPress={onClose} className="bg-red-500 text-white">
                    Close
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
