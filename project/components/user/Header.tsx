import { ShoppingCartOutlined } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <button className="flex items-center gap-[10px]">
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
          <button className="hover:bg-gray-700 p-2 rounded">
            Trang sản phẩm
          </button>
          <button className="hover:bg-gray-700 p-2 rounded">Lịch sử mua</button>
          <button className="hover:bg-gray-700 p-2 rounded">Sản Phẩm Yêu Thích</button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded hover:bg-gray-700">
            <ShoppingCartOutlined />
          </button>
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
        </div>
      </div>
    </div>
  );
}
