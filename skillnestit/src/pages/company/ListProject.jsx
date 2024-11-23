import React, { useEffect } from "react";
import { Sidebar } from "./Navigation/Sidebar";
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { NavMobile } from "./Navigation/NavMobile";
import { CreateProject } from "./Modal/AddProject";
import { useDispatch, useSelector } from "react-redux";
import getCompanyProjects from "../../services/getCompanyProjects";
import { EditProject } from "./Modal/Edit";
import { confirmAlert } from "react-confirm-alert";
import { axiosInstance } from "../../lib/axios";
import { destroyProject } from "../../redux/actions/ProjectActions";
import { Detail } from "./Modal/Detail";

const ListProjectCompany = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const dispatch = useDispatch();
  const companyProjects = useSelector(
    (state) => state.companyProject.companyProjects
  );

  //search and pagination function
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...companyProjects];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [companyProjects, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by project name..."
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    companyProjects.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  //delete function
  const token = localStorage.getItem("token");
  const handleDelete = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axiosInstance.delete(`/projects/${id}`, { headers: headers });
      dispatch(destroyProject(id));
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "custom-overlay",
    });
  };

  useEffect(() => {
    getCompanyProjects(dispatch);
  }, [dispatch]);

  return (
    <div className="lg:flex h-screen max-lg:flex-col">
      {/* sidebar */}
      <div className="max-lg:hidden">
        <Sidebar />
      </div>

      {/* navigation mobile */}
      <div className="lg:hidden">
        <NavMobile />
      </div>

      {/* main content */}
      <div className="w-screen bg-primary max-lg:h-screen">
        <div className="h-screen p-4 flex-col max-lg:p-2">
          <div className="flex justify-between mb-2">
            <CreateProject />
          </div>
          <p className="text-secondary font-bold text-center lg:hidden">
            List Projet
          </p>
          <div>
            <Table
              bottomContent={bottomContent}
              topContent={topContent}
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn className="text-center">Project Name</TableColumn>
                <TableColumn className="text-center">Company</TableColumn>
                <TableColumn className="text-center">Action</TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-center">{row.name}</TableCell>
                    <TableCell className="text-center">
                      {row.companyname}
                    </TableCell>
                    <TableCell className="flex justify-center gap-4 max-lg:gap-1">
                      <Detail item={row}/>
                      <EditProject item={row} />
                      <Button
                        color="danger"
                        onClick={() => confirmDelete(row.id)}
                        className="max-lg:hidden"
                      >
                        <i class="fa-solid fa-trash"></i> Delete
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => confirmDelete(row.id)}
                        className="lg:hidden"
                        size="sm"
                        isIconOnly
                        variant="light"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProjectCompany;
