"use client";
import React, { useState } from "react";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";

export default function page() {
  const [selectedColor, setSelectedColor] = useState("Gege 01");
  const [quantity, setQuantity] = useState(1);

  const colors = [
    "Gege 01",
    "Gege 02",
    "Gege 03",
    "Gege 04",
    "Gege 05",
    "Gege 06",
    "H01 Cam đào",
    "H02 đỏ nhung",
    "H03 nâu đỏ trầm",
    "H04 Hồng trà",
    "H05 đỏ nâu trầm",
    "Pink coco 01",
  ];

  const handleQuantityChange = (value: number) => {
    if (quantity + value > 0) setQuantity(quantity + value);
  };
  return (
    <div>
      <Header></Header>
      <div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src="/path/to/image.jpg"
                alt="Product"
                className="w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Son Kem GEGE BEAR tông màu hổ phách chống dính lâu trôi
              </h1>

              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="ml-2 text-gray-600">4.7 (9,200 reviews)</span>
              </div>

              <div className="mb-4">
                <span className="text-3xl text-orange-600 font-bold">
                  ₫8,000 - ₫17,900
                </span>
                <div className="text-gray-500 line-through">
                  ₫48,000 - ₫420,000
                </div>
                <div className="text-red-500">-42% Off</div>
              </div>

              <div className="flex items-center mb-6">
                <h3 className="text-lg font-semibold mr-4">Số Lượng</h3>
                <button
                  className="px-2 py-1 border rounded-lg"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-2 py-1 border rounded-lg"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>

              <div className="flex space-x-4">
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg">
                  Thêm Vào Giỏ Hàng
                </button>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg">
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
