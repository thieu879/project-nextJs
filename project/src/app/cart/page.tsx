"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/stores/store";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import { FaTrashAlt } from "react-icons/fa";
import { getCartItem, removeItemFromCart } from "../../../redux/stores/reducers/cartReducer";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id)).catch((error) => {
      console.error("Failed to remove item:", error);
    });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 14;
  const discount = 0;
  const total = subtotal + delivery - discount;

  const formatPrice = (price: number) => `₫${price.toLocaleString("vi-VN")}`;
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const handleLabelClick = (label: string) => {
    setSelectedLabel(label);
  };
  useEffect(() => {
    dispatch(getCartItem())
  },[])
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Giỏ Hàng</h2>
            <table className="table-auto w-full mb-6">
              <thead>
                <tr>
                  <th className="text-left">Sản Phẩm</th>
                  <th className="text-left">Tên</th>
                  <th className="text-left">Giá</th>
                  <th className="text-left">Số Lượng</th>
                  <th className="text-left">Xoá</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md mr-4"
                      />
                    </td>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{formatPrice(item.price)}</td>
                    <td className="py-2">
                      <div className="flex items-center">
                        <span className="mx-2">{item.quantity}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrashAlt className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Thông Tin Giao Hàng</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Tên đầy đủ</label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ của bạn"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Loại Địa chỉ:</label>
              <div className="flex space-x-4">
                <button
                  className={`flex items-center px-4 py-2 rounded-lg border ${
                    selectedLabel === "OFFICE"
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleLabelClick("OFFICE")}
                  aria-label="Select office address"
                >
                  <i className="fa-solid fa-briefcase mr-2"></i>Công Ty
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg border ${
                    selectedLabel === "HOME"
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleLabelClick("HOME")}
                  aria-label="Select home address"
                >
                  <i className="fa-solid fa-house mr-2"></i>Nhà Ở
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 mt-6 md:mt-0">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold">Tổng Kết</h3>
              <div className="flex justify-between mt-2">
                <p>Tổng phụ</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Phí giao hàng</p>
                <p>{formatPrice(delivery)}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Giảm giá</p>
                <p>-{formatPrice(discount)}</p>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <p>Tổng cộng</p>
                <p>{formatPrice(total)}</p>
              </div>
              <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg">
                Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
