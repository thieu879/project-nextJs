"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faWrench,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebars from "../../../../components/admin/Sidebar";
import { AppDispatch, RootState } from "../../../../redux/stores/store";
import {
  deleteUsers,
  getUsers,
  updateUserStatus,
} from "../../../../redux/service/userManagement.service";

interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  statusLogIn: boolean;
  role: number;
}

export default function UserManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(2);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.role === 1);
    setSortedUsers(filteredUsers);
  }, [users]);

  const changeStatus = (id: number, status: boolean) => {
    dispatch(updateUserStatus({ id, status }));
  };

  const handleSort = (field: keyof User) => {
    const sorted = [...sortedUsers].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setSortedUsers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // const handleDelete = async (id: number) => {
  //   const result = await Swal.fire({
  //     title: "Bạn có chắc chắn không?",
  //     text: "Hành động này sẽ xoá người dùng này!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Xoá",
  //   });

  //   if (result.isConfirmed) {
  //     dispatch(deleteUsers(id))
  //       .then(() => {
  //         Swal.fire("Đã Xoá!", "Người dùng đã được xoá.", "success");
  //       })
  //       .catch(() => {
  //         Swal.fire("Lỗi!", "Không thể xoá người dùng.", "error");
  //       });
  //   }
  // };

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <Sidebars />
      <div className="p-4 ml-auto mr-auto w-full max-w-6xl">
        <form className="mb-6 flex items-center space-x-4">
          <label htmlFor="search" className="text-lg font-medium">
            Tìm Kiếm Người Dùng:
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full max-w-md"
            placeholder="Nhập tên hoặc email..."
          />
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">STT</th>
                <th
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Tên
                  <FontAwesomeIcon
                    icon={sortOrder === "asc" ? faSortUp : faSortDown}
                    className="ml-2"
                  />
                </th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Trạng Thái</th>
                {/* <th className="px-4 py-2 border">Hành Động</th> */}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <td className="px-4 py-2 border">
                      {index + 1 + indexOfFirstUser}
                    </td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => changeStatus(user.id, user.status)}
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          user.status
                            ? "bg-green-200 text-green-600"
                            : "bg-red-400 text-red-600"
                        }`}
                      >
                        {user.status ? "Hoạt Động" : "Không Hoạt Động"}
                      </button>
                    </td>
                    {/* <td className="px-4 py-2 border">
                      <FontAwesomeIcon
                        icon={faWrench}
                        className="cursor-pointer mr-2 text-blue-500"
                        title="Sửa"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer text-red-500"
                        title="Xoá"
                        onClick={() => handleDelete(user.id)}
                      />
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 border text-center">
                    Không tìm thấy người dùng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
          >
            &laquo; Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
          >
            Tiếp &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}
