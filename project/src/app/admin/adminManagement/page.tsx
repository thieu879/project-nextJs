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
import {
  deleteAdmin,
  getAdmins,
  updateAdminStatus,
  addAdmin,
  updateAdmin,
} from "../../../../redux/service/userManagement.service";

interface Admin {
  id: number;
  name: string;
  email: string;
  password?: string;
  status: boolean;
  role: number;
}

export default function AdminManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const admins = useSelector((state: RootState) => state.users.users);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [sortedAdmin, setSortedAdmins] = useState<Admin[]>([]);


  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

    useEffect(() => {
      const filteredAdmins = admins.filter((admins) => admins.role === 0);
      setSortedAdmins(filteredAdmins);
    }, [admins]);

  const handleSort = (key: keyof Admin) => {    
    const sorted = [...sortedAdmin].sort((a:any, b:any) => {
      if (sortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setSortedAdmins(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  const changeStatus = (id: number, status: boolean) => {
    
    dispatch(updateAdminStatus({ id, status }));
    
  };
  
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Hành động này sẽ xoá admin này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá",
    });

    if (result.isConfirmed) {
      dispatch(deleteAdmin(id))
        .then(() => {
          Swal.fire("Đã Xoá!", "Admin đã được xoá.", "success");
        })
        .catch(() => {
          Swal.fire("Lỗi!", "Không thể xoá admin.", "error");
        });
    }
  };

  const filteredAdmins = sortedAdmin.filter(
    (admin) =>
      admin.role === 0 &&
      (admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenModal = (admin: Admin | null = null) => {
    setCurrentAdmin(admin);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentAdmin(null);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const status = formData.get("status") === "true";

    if (currentAdmin) {
      dispatch(updateAdmin({ ...currentAdmin, name, email, status }))
        .then(() => {
          Swal.fire(
            "Cập Nhật Thành Công!",
            "Admin đã được cập nhật.",
            "success"
          );
          handleCloseModal();
        })
        .catch(() => {
          Swal.fire("Lỗi!", "Không thể cập nhật admin.", "error");
        });
    } else {
      dispatch(addAdmin({ name, email, password, status, role: 0 }))
        .then(() => {
          Swal.fire("Thêm Thành Công!", "Admin đã được thêm.", "success");
          handleCloseModal();
        })
        .catch(() => {
          Swal.fire("Lỗi!", "Không thể thêm admin.", "error");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebars />
      <div className="p-4 ml-auto mr-auto w-full max-w-6xl">
        <button
          onClick={() => handleOpenModal()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Thêm Admin
        </button>
        <form className="mb-6 flex items-center space-x-4">
          <label htmlFor="search" className="text-lg font-medium">
            Tìm Kiếm Admin:
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
                <th className="px-4 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin, index) => (
                  <tr
                    key={admin.id}
                    className="text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{admin.name}</td>
                    <td className="px-4 py-2 border">{admin.email}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => changeStatus(admin.id, admin.status)}
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          admin.status
                            ? "bg-green-200 text-green-600"
                            : "bg-red-400 text-red-600"
                        }`}
                      >
                        {admin.status ? "Hoạt Động" : "Không Hoạt Động"}
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      <FontAwesomeIcon
                        icon={faWrench}
                        className="cursor-pointer mr-2 text-blue-500"
                        title="Sửa"
                        onClick={() => handleOpenModal(admin)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer text-red-500"
                        title="Xoá"
                        onClick={() => handleDelete(admin.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 border text-center">
                    Không tìm thấy admin nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {currentAdmin ? "Cập Nhật Admin" : "Thêm Admin"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={currentAdmin?.name || ""}
                    required
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={currentAdmin?.email || ""}
                    required
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật Khẩu:
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={
                      currentAdmin ? "Để trống nếu không đổi mật khẩu" : ""
                    }
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trạng Thái:
                  </label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={currentAdmin?.status.toString() || "false"}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  >
                    <option value="true">Hoạt Động</option>
                    <option value="false">Không Hoạt Động</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    {currentAdmin ? "Cập Nhật" : "Thêm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
