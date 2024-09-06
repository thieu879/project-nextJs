"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getUsers } from "../../../../redux/service/userManagement.service";

interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  role: number;
}

const UserManagement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status, error } = useSelector(
    (state: RootState) => state.admin
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSort = (field: keyof User) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Hành động này sẽ xoá người dùng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete operation (e.g., dispatch delete action)
        Swal.fire("Đã Xoá!", "Người dùng đã được xoá.", "success");
      }
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <title>Quản Lý Người Dùng</title>
      <link rel="icon" href="https://logodix.com/logo/1707097.png" />
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
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">STT</th>
                <th
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => handleSort("name")}
                  aria-label="Sort by Name"
                >
                  Tên
                  <FontAwesomeIcon
                    icon={sortOrder === "asc" ? faSortUp : faSortDown}
                    className="ml-2"
                  />
                </th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Trạng Thái</th>
                <th className="px-4 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          user.status
                            ? "bg-green-200 text-green-600"
                            : "bg-red-400 text-red-600"
                        }`}
                      >
                        {user.status ? "Hoạt Động" : "Không Hoạt Động"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
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
                    </td>
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
      </div>
    </div>
  );
};

export default UserManagement;
