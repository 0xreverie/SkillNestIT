import React, { useEffect } from "react";
import { Sidebar } from "./Navigation/Sidebar";
import { NavMobile } from "./Navigation/NavMobile";
import {
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Review } from "./Modal/Review";
import { useDispatch, useSelector } from "react-redux";
import getReviewProjects from "../../services/getReviewProjects";
import { updateDetailProject } from "../../redux/actions/DetailProjectActions";
import { axiosInstance } from "../../lib/axios";

export const ReviewProject = () => {

  const [filterValue, setFilterValue] = React.useState(""); 
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([])); 
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const dispatch = useDispatch();
  const reviewProject = useSelector(
    (state) => state.detailProject.detailProjects
  );

  //give feedback
  const token = localStorage.getItem("token");

  const giveFeedback = async (id, feedback, status) => {
    try {
      const response = await axiosInstance.put(`/feedback/${id}`, {feedback, status: "Done"}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
      dispatch(updateDetailProject(response.data));
      await getReviewProjects(dispatch);
    } catch (error) {
      console.error("Error patching data:", error);
    }
  };

  useEffect(() => {
    getReviewProjects(dispatch);
  }, [dispatch]);

  //search and pagination function
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...reviewProject];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.studentname.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [reviewProject, filterValue]);

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

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by student name..."
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  },  [
    filterValue,
    onRowsPerPageChange,
    reviewProject.length,
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
          <div className="flex justify-end max-lg:justify-center">
            <p className="text-secondary font-bold lg:hidden">Review Project</p>
          </div>
          <br className="max-lg:hidden" />
          <div className="text-center">
            <Table
              bottomContent={bottomContent}
              topContent={topContent}
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn className="text-center">Student Name</TableColumn>
                <TableColumn className="text-center">Project</TableColumn>
                <TableColumn className="text-center">Link</TableColumn>
                <TableColumn className="text-center">Date</TableColumn>
                <TableColumn className="text-center">Status</TableColumn>
                <TableColumn className="text-center">Action</TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((detail) => {
                  return (
                    <TableRow key={detail.id}>
                      <TableCell className="text-center"> {detail.studentname} </TableCell>
                      <TableCell className="text-center"> {detail.projectname} </TableCell>
                      <TableCell className="text-center"> {detail.link} </TableCell>
                      <TableCell className="text-center"> {detail.date} </TableCell>
                      <TableCell className="text-center"> {detail.status === 'Done' ? <Chip color="success" className="text-white">Reviewed</Chip> : <Chip color="danger">Waiting</Chip>} </TableCell>
                      <TableCell className="flex justify-center gap-4 max-lg:gap-1">
                        <Review item={detail} giveFeedback={giveFeedback} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
