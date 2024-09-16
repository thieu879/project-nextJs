"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import Footer from "../../../components/user/Footer";
import Header from "../../../components/user/Header";
import { getUsers } from "../../../redux/service/userManagement.service";
import { RootState } from "../../../redux/stores/store";

export default function Infor() {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [userName, setUserName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userId = Number(localStorage.getItem("userId"));
  const currentUser = users.find((user: any) => user.id === userId);

  if (!currentUser) {
    return <div>Người dùng không tìm thấy.</div>;
  }

  const verifyOldPassword = (oldPassword: string) => {
    const decryptedPassword = CryptoJS.AES.decrypt(
      currentUser.password,
      "secret key 123"
    ).toString(CryptoJS.enc.Utf8);
    return decryptedPassword === oldPassword;
  };

  const handleSaveInfo = async () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Mật khẩu mới và xác nhận không khớp",
      });
      return;
    }

    if (newPassword && !verifyOldPassword(oldPassword)) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Mật khẩu cũ không đúng",
      });
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: userName || currentUser.name,
      ...(newPassword && {
        password: CryptoJS.AES.encrypt(
          newPassword,
          "secret key 123"
        ).toString(),
      }),
    };

    try {
      await axios.put(
        `http://localhost:8080/account/${currentUser.id}`,
        updatedUser
      );

      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật thông tin thành công",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Lỗi cập nhật thông tin",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          {!showPasswordReset ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Tên:</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="text"
                  value={userName || currentUser.name}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="text"
                  value={currentUser.email}
                  readOnly
                />
              </div>
              <button
                onClick={() => setShowPasswordReset(true)}
                className="w-full px-3 py-2 mt-4 text-blue-600"
              >
                Đổi Mật Khẩu
              </button>
              <button
                onClick={handleSaveInfo}
                className="w-full px-3 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-500"
              >
                Lưu Thông Tin
              </button>
            </>
          ) : (
            <div>
              <button
                onClick={() => setShowPasswordReset(false)}
                className="mb-4 p-2 bg-gray-300 rounded"
              >
                Quay Lại
              </button>
              <div className="mb-4">
                <label className="block text-gray-700">Nhập Mật Khẩu Cũ:</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Nhập Mật Khẩu Mới:
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Nhập Lại Mật Khẩu Mới:
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <button
                onClick={handleSaveInfo}
                className="w-full px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
              >
                Lưu Mật Khẩu
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
