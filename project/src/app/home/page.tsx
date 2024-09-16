"use client";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import "../../../style/home.css";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("right");

  const images = [
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Simple%20Modern%20Photo%20Collage%20Autumn%20Fashion%20Sale%20Banner.png?alt=media&token=887131d0-2723-4b4e-887f-1e8f332528b0",
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Gray%20Minimalist%20Fashion%20Big%20Sale%20Banner.png?alt=media&token=321bf5d6-a383-408b-b4d8-adf4319589cd",
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Green%20and%20Yellow%20Simple%20Clean%20Shoes%20Sale%20Banner.png?alt=media&token=1cd0d2ed-ae94-43db-8b67-04cc5402f227",
  ];

  const handlePrev = () => {
    setTransitionDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setTransitionDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Header />
      <div className="relative mb-[100px] mt-[50px]">
        <title>Bán Hàng Trực Tuyến</title>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
        />
        <div className="relative w-full h-[500px] overflow-hidden">
          <TransitionGroup className="relative w-full h-full">
            <CSSTransition
              key={currentIndex}
              timeout={1000}
              classNames={
                transitionDirection === "right"
                  ? {
                      enter: "slide-enter-right",
                      enterActive: "slide-enter-right-active",
                      exit: "slide-exit-left",
                      exitActive: "slide-exit-left-active",
                    }
                  : {
                      enter: "slide-enter-left",
                      enterActive: "slide-enter-left-active",
                      exit: "slide-exit-right",
                      exitActive: "slide-exit-right-active",
                    }
              }
            >
              <div
                className="slider-image"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
              ></div>
            </CSSTransition>
          </TransitionGroup>
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={handlePrev}
              className="bg-white p-2 rounded-full shadow-md"
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-left text-black"></i>
            </button>
            <button
              onClick={handleNext}
              className="bg-white p-2 rounded-full shadow-md"
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-right text-black"></i>
            </button>
          </div>
        </div>
      </div>

      <div>
        <main className="bg-gray-100 min-h-screen py-12">
          <div className="max-w-6xl mx-auto px-4">
            <section className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg p-8">
              <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src="https://cdn.shopify.com/shopifycloud/brochure/assets/shop/social-proof-small-cdbbda076b7642297b4985f8cf7e1786174d323f7169b4f0c87f84f1727624fc.png"
                  alt="Bảng điều khiển ứng dụng Shop"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="w-full lg:w-1/2 lg:pl-8">
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2 text-gray-800">
                    Doanh số
                  </div>
                  <div className="text-2xl text-green-600 mb-4">12.245₫</div>
                  <div className="text-gray-500 text-lg">
                    Doanh số theo thời gian
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-green-300 h-40 rounded-lg mt-4"></div>
                </div>

                <div>
                  <div className="text-2xl font-semibold mb-2">Đánh giá</div>
                  <div className="text-xl text-gray-600 mb-4">
                    Đánh giá trung bình:{" "}
                    <span className="text-green-600">4.8</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="block w-4 h-4 bg-gray-300 mr-2"></span>
                      <span>Đánh giá tích cực</span>
                    </li>
                    <li className="flex items-center">
                      <span className="block w-4 h-4 bg-blue-300 mr-2"></span>
                      <span>Đánh giá trung lập</span>
                    </li>
                    <li className="flex items-center">
                      <span className="block w-4 h-4 bg-red-300 mr-2"></span>
                      <span>Đánh giá tiêu cực</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-12 bg-white shadow-lg rounded-lg p-8">
              <blockquote className="text-xl italic text-gray-700">
                “Ứng dụng Shop đã trở thành nền tảng quan trọng giúp thương hiệu
                Bán Hàng Trực Tuyến của chúng tôi phát triển. Ứng dụng cho phép chúng
                tôi cập nhật cho khách hàng những sản phẩm mới, tương tác với
                khách hàng và hỗ trợ nhận diện thương hiệu khi chúng tôi mở
                rộng. Xin gửi lời cảm ơn lớn đến Shop vì đã giúp chúng tôi thành
                công.”
              </blockquote>
            </section>
          </div>
        </main>
      </div>
      <div className="flex justify-center items-center space-x-8 my-10">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img
            src="https://cdn.shopify.com/shopifycloud/brochure/assets/shop/resource-help-small-bc630ab17f8fb881da5aac0f80b9bdb93b285ddc1a954e76ca903a4f394c0a4b.jpg"
            alt="Trung tâm trợ giúp"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Trung tâm trợ giúp</h2>
            <p className="text-gray-700 mb-4">
              Tìm hiểu thêm về thanh toán nhanh Shop Pay.
            </p>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img
            src="https://cdn.shopify.com/shopifycloud/brochure/assets/shop/resource-support-small-e67581ac47d52bd37c5362485e5ba32d289588496d02e4b0ea55581c412bcaa5.jpg"
            alt="Hỗ trợ"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Hỗ trợ</h2>
            <p className="text-gray-700 mb-4">
              Nhận sự hỗ trợ khi bạn cần nhất.
            </p>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img
            src="https://cdn.shopify.com/shopifycloud/brochure/assets/shop/resource-blog-small-e53207f8893ddc46eef9cac86f2ffe5ce9dcedcad91f1f8ec5f616a938a7ece0.jpg"
            alt="Blog"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Blog</h2>
            <p className="text-gray-700 mb-4">
              Khám phá các tính năng mới trên Shop Pay.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
