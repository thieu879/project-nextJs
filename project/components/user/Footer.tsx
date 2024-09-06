import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white p-10">
      <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
        <div className="text-lg font-semibold">
          Liên hệ với chúng tôi qua các trang web:
        </div>
        <div className="flex space-x-4 items-center">
          <button
            aria-label="Facebook"
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition duration-300"
          >
            <i className="fab fa-facebook text-xl"></i>
          </button>
          <button
            aria-label="TikTok"
            className="bg-black hover:bg-gray-800 p-3 rounded-full transition duration-300"
          >
            <i className="fab fa-tiktok text-xl"></i>
          </button>
          <button
            aria-label="Twitter"
            className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition duration-300"
          >
            <i className="fab fa-twitter text-xl"></i>
          </button>
          <button
            aria-label="Instagram"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition duration-300"
          >
            <i className="fab fa-instagram text-xl"></i>
          </button>
        </div>
      </div>

      <hr className="my-8 border-gray-600" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <img
            className="mx-auto md:mx-0"
            style={{ width: "200px" }}
            src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
            alt="Giao Hàng Ưu Tiên"
          />
          <h3 className="mt-4 font-semibold">
            Rẻ như bèo, nghèo cũng có tiền mua!
          </h3>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Sản Phẩm</h3>
          <ul className="space-y-2">
            <li>Áo Mùa Đông</li>
            <li>Áo Mùa Hè</li>
            <li>Áo mùa Thu Đông</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Trợ Giúp</h3>
          <ul className="space-y-2">
            <li>Điều Khoản</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
          <ul className="space-y-2">
            <li>
              <i className="fas fa-map-marker-alt mr-2"></i>
              Đanh Trại - Yên Thọ - Ý Yên - Nam Định
            </li>
            <li>
              <i className="fas fa-envelope mr-2"></i>
              nguyenthieu11021995@gmail.com
            </li>
            <li>
              <i className="fas fa-phone mr-2"></i>
              0355483082
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
