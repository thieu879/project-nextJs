"use client";
import { ShoppingCartOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(getUsers());
    const storedStatus = localStorage.getItem("userStatus");
    if (storedStatus) {
      setIsLoggedIn(storedStatus === "true");
    }
  }, [dispatch]);

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

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-[10px]"
          >
            <img
              className="w-24 h-24"
              src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
              alt="Logo"
            />
            <div>Bán Hàng Online</div>
          </button>
        </div>

        <div className="flex space-x-4">
          <button className="hover:bg-gray-700 p-2 rounded">Trang chủ</button>
          <button
            onClick={handleProduct}
            className="hover:bg-gray-700 p-2 rounded"
          >
            Trang sản phẩm
          </button>
          <button className="hover:bg-gray-700 p-2 rounded">Lịch sử mua</button>
          <button className="hover:bg-gray-700 p-2 rounded">
            Sản Phẩm Yêu Thích
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleCart}
            className="p-2 rounded hover:bg-gray-700"
          >
            <ShoppingCartOutlined />
          </button>

          <div>
            {isLoggedIn ? (
              <div>
                <div>
                  <img
                    className="w-[70px] h-[70px] rounded-[50%]"
                    src="https://i.pinimg.com/236x/ef/f2/5a/eff25a312c33e599eb01d7031caf135d.jpg"
                    alt="User Avatar"
                  />
                </div>
                <ul>
                  <li>
                    <button>Thông tin cá nhân</button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Đăng Xuất</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signUp"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                >
                  Đăng ký
                </Link>
                <Link
                  href="/signIn"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
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
