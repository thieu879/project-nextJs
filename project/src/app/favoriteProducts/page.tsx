import React from 'react'
import Header from '../../../components/user/Header'
import Footer from '../../../components/user/Footer';

export default function page() {
  return (
    <div>
      <Header></Header>
      <div className="border rounded-lg p-[100px] flex justify-between items-center">
        <div className="flex items-start">
          <img
            src="https://example.com/product-image.jpg"
            alt="Product"
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="ml-4">
            <div className="flex items-center mb-2">
              <h2 className="ml-2 font-semibold text-lg">
                Lồng bàn giữ nhiệt 5 tầng bảo quản thực phẩm, chống bụi và côn
                trùng
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              CHỌN SẢN PHẨM: Khay hấp lò vi sóng
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-orange-600 text-xl font-bold mb-1">₫31,542</div>
          <div className="line-through text-gray-500 text-sm">₫60,000</div>
          <div className="text-green-600 text-sm font-medium">-47%</div>
          <div className="text-green-500 text-sm">Price dropped</div>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 ml-4 rounded-lg hover:bg-orange-500">
          <span className="mr-2">+</span>
          <i className="fas fa-shopping-cart"></i   >
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}
