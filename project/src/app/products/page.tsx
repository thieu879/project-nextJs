"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import { AppDispatch, RootState } from "../../../redux/stores/store";
import { getProduct } from "../../../redux/service/productManagement.service";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: string;
  description: string;
}

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);
  const router = useRouter();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const navigateToDetail = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-center items-center py-8 gap-4">
        {product?.map((item: Product) => (
          <button
            key={item.id}
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            onClick={() => navigateToDetail(item.id)} // Navigate to detail page
          >
            <img
              className="w-full h-48 object-cover"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                {item.name}
              </h3>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl font-bold text-orange-500">
                  ₫{item.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₫{(parseFloat(item.price) * 1.42).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">-42%</span>
              </div>

              <div className="text-sm text-gray-600">
                <span>Số lượng còn lại: {item.stock}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}
