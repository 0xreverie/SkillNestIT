import { Avatar, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUsersData from "../../services/getUsers";
import { axiosInstance } from "../../lib/axios";
import { editUser } from "../../services/editUser";

export const StudentSettings = ({item}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUsersData(dispatch);
  }, [dispatch])


  //edit user
  const [formData, setFormData] = useState({
    // idcompany: sessionStorage.getItem("userId"),
    // name: item.name,
    // email: item.email,
    // telp: item.telp
  });

  console.log('data: ', users)
  console.log('data patch: ', formData)

  const handleUpdate = () => {
    dispatch(editUser(item.id, formData));
  };

  return (
    <div className="lg:flex h-auto max-lg:flex-col">
      {/* navigation mobile */}

      {/* Main Content */}
      <div className="w-screen bg-primary max-lg:h-screen">
        <div className="h-screen flex flex-col items-center pt-8">
          <h1 className="font-semibold text-4xl text-secondary">Settings</h1>
          <br />
          <br />
          <br />
          <Avatar
            src="https://aksaranesia.com/wp-content/uploads/2024/10/0_7c2b07f4-77e5-4d9d-9c2a-db7ac6e99011_1200x1200-e1727764881215.webp"
            className="w-20 h-20 text-large"
          />
          <br />
          <div className="flex flex-col items-center">
            <div className="flex">
              <Input
                className="m-2"
                size="md"
                type="text"
                label="Name"
                labelPlacement="outside"
                // value={formData.name}
                // onChange={(e) =>
                //   setFormData({ ...formData, name: e.target.value })
                // }
              />
              <Input
                className="m-2"
                size="md"
                type="text"
                label="Telephone"
                labelPlacement="outside"
                // value={formData.telp}
                // onChange={(e) =>
                //   setFormData({ ...formData, telp: e.target.value })
                // }
              />
            </div>
            <div className="flex flex-col w-full p-2" >
              <Input
                size="md"
                type="text"
                label="Email Address"
                labelPlacement="outside"
                // value={formData.email}
                // onChange={(e) =>
                //   setFormData({ ...formData, email: e.target.value })
                // }
              />
              <br />
              <Button className="bg-secondary text-white"><i class="fa-solid fa-floppy-disk"></i> Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

