"use client";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getUsers,
  updateUserStatusLogIn,
} from "../../redux/service/userManagement.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/stores/store";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const statusLogIn = useSelector((state: RootState) => state.users.users);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
    const storedStatus = localStorage.getItem("userStatus");
    if (storedStatus === "true") {
      setIsLoggedIn(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Bạn phải đăng nhập để truy cập vào trang này!",
        confirmButtonText: "Đăng Nhập",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signIn");
        }
      });
    }
  }, [dispatch, router]);

  const handleLogout = async () => {
    const userId = Number(localStorage.getItem("userId"));
    if (userId) {
      await dispatch(
        updateUserStatusLogIn({ id: userId, statusLogIn: false })
      ).unwrap();
      localStorage.removeItem("userStatus");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      router.push("/signIn");
    } else {
      console.error("User ID not found in localStorage");
    }
  };

  const handleProduct = () => {
    router.push("/products");
  };

  const handleCart = () => {
    router.push("/cart");
  };
  const handleInfor = () => {
    router.push("/infor");
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2"
          >
            <img
              className="w-16 h-16"
              src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
              alt="Logo"
            />
            <span className="text-xl font-bold">Bán Hàng Online</span>
          </button>
        </div>

        <nav className="flex space-x-6">
          <button
            onClick={() => router.push("/home")}
            className="hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            Trang chủ
          </button>
          <button
            onClick={handleProduct}
            className="hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            Trang sản phẩm
          </button>
          <button className="hover:bg-gray-800 px-4 py-2 rounded-md transition-colors">
            Lịch sử mua
          </button>
          <button
            onClick={() => router.push("/favoriteProducts")}
            className="hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            Sản Phẩm Yêu Thích
          </button>
        </nav>

        <div className="flex items-center space-x-6">
          <button
            onClick={handleCart}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ShoppingCartOutlined className="text-white" />
          </button>

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://i.pinimg.com/236x/ef/f2/5a/eff25a312c33e599eb01d7031caf135d.jpg"
                  alt="User Avatar"
                />
                <div className="relative mt-[25px]">
                  <ul
                    className={`absolute bg-white text-gray-800 right-0 mt-2 w-40 shadow-lg rounded-lg overflow-hidden transition-opacity duration-200 ${
                      isDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <li>
                      <button
                        onClick={handleInfor}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Thông tin cá nhân
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Đăng Xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signUp"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Đăng ký
                </Link>
                <Link
                  href="/signIn"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Đăng Nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
