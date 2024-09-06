import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Đăng Nhập
        </h2>
        <form>
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
              className="block w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Đồng ý với điều khoản
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đăng Nhập
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link legacyBehavior href="/signUp">
            <a className="text-indigo-600 hover:text-indigo-800 text-sm">
              Chưa có tài khoản? Đăng ký
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
