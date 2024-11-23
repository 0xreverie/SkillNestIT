// pages/dashboard.js
import React, { useEffect } from "react";
import { Sidebar } from "./Navigation/Sidebar";
import { NavMobile } from "./Navigation/NavMobile";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import bg from "../../assets/Home.png";
import getCompanyProjects from "../../services/getCompanyProjects";
import getReviewProjects from "../../services/getReviewProjects";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.companyProject.companyProjects);

  const review = useSelector((state) => state.detailProject.detailProjects);

  useEffect(() => {
    getCompanyProjects(dispatch);
    getReviewProjects(dispatch);
  }, [dispatch]);

  const done = review.filter((v) => v.status === "Done");
  const wait = review.filter((v) => v.status === "Waiting to review");

  return (
    <div className="lg:flex h-screen max-lg:flex-col">
      {/* Sidebar */}
      <div className="max-lg:hidden">
        <Sidebar />
      </div>

      {/* navigation mobile */}
      <div className="lg:hidden">
        <NavMobile />
      </div>

      {/* Main Content */}
      <div className="w-screen bg-primary max-lg:h-screen">
        <div
          className="h-screen flex justify-center items-center max-lg:flex-col"
          style={{
            backgroundImage: `url(${bg})`, // Gunakan gambar yang di-import
            backgroundSize: "cover", // Gambar menyesuaikan ukuran layar
            backgroundPosition: "center", // Memastikan gambar terpusat
            backgroundRepeat: "no-repeat", // Menghindari gambar terulang
          }}
        >
          <Card className="w-60 h-60 m-8 bg-primary max-lg:w-72 max-lg:h-64">
            <CardHeader className="flex-col font-extrabold text-4xl max-lg:text-2xl">
              List Project
            </CardHeader>
            <CardBody className="text-center font-extrabold text-4xl mt-10 max-lg:text-2xl max-lg:mt-1">
              <i class="fa-solid fa-list"></i>
              {list.length}
            </CardBody>
          </Card>
            <Card className="w-60 h-60 m-8 bg-primary max-lg:w-72 max-lg:h-64">
              <CardHeader className="flex-col font-extrabold text-4xl max-lg:text-2xl">
                Reviewed
              </CardHeader>
              <CardBody className="text-center text-green-500 font-extrabold text-4xl mt-10 max-lg:text-2xl max-lg:mt-1 ">
                <i class="fa-solid fa-eye"></i> {done.length}
              </CardBody>
            </Card>
            <Card className="w-60 h-60 m-8 bg-primary max-lg:w-72 max-lg:h-64">
              <CardHeader className="flex-col font-extrabold text-4xl max-lg:text-2xl">
                Waiting
              </CardHeader>
              <CardBody className="text-center text-red-500 font-extrabold text-4xl mt-10 max-lg:text-2xl max-lg:mt-1">
                <i class="fa-solid fa-eye"></i> {wait.length}
              </CardBody>
            </Card>
        </div>
      </div>
    </div>
  );
};
