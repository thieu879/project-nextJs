"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  loginUser,
  updateUserStatusLogIn,
} from "../../../redux/service/userManagement.service";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((user: any) => {
        dispatch(
          updateUserStatusLogIn({ id: user.id, statusLogIn: true })
        ).then(() => {
          localStorage.setItem("userId", user.id.toString());
          localStorage.setItem("userStatus", "true");
          router.push("/home");
        });
      })
      .catch((error: any) => {
        Swal.fire({
          icon: "error",
          title: "Đã xảy ra lỗi",
          text: error.message || "Vui lòng thử lại.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nhập Mật Khẩu:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg"
          >
            Đăng Nhập
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/signUp"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Chưa có tài khoản? Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
