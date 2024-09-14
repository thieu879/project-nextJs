"use client";
import React, { useEffect, useState } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const navigateToDetail = (id: number) => {
    router.push(`/products/${id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePriceFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    setPriceFilter({ ...priceFilter, [type]: e.target.value });
  };

  const filterAndSortProducts = () => {
    let filteredProducts = [...product];

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((item: Product) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceFilter.min || priceFilter.max) {
      const minPrice = priceFilter.min ? parseFloat(priceFilter.min) : 0;
      const maxPrice = priceFilter.max ? parseFloat(priceFilter.max) : Infinity;

      filteredProducts = filteredProducts.filter(
        (item: Product) =>
          parseFloat(item.price) >= minPrice &&
          parseFloat(item.price) <= maxPrice
      );
    }

    if (sortBy === "name-asc") {
      filteredProducts.sort((a: Product, b: Product) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortBy === "name-desc") {
      filteredProducts.sort((a: Product, b: Product) =>
        b.name.localeCompare(a.name)
      );
    } else if (sortBy === "price-asc") {
      filteredProducts.sort(
        (a: Product, b: Product) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (sortBy === "price-desc") {
      filteredProducts.sort(
        (a: Product, b: Product) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    return filteredProducts;
  };

  const paginateProducts = () => {
    const filteredProducts = filterAndSortProducts();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalProducts = filterAndSortProducts().length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const displayedProducts = paginateProducts();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Sort Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="w-full md:w-auto flex items-center space-x-2">
              <label htmlFor="search" className="font-semibold">
                Tìm Kiếm:
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 p-2 rounded w-full md:w-72"
              />
            </div>
            <div className="w-full md:w-auto flex items-center space-x-2">
              <label className="font-semibold">Sắp Xếp:</label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="name-asc">Tên (A-Z)</option>
                <option value="name-desc">Tên (Z-A)</option>
                <option value="price-asc">Giá Tăng Dần</option>
                <option value="price-desc">Giá Giảm Dần</option>
              </select>
            </div>
            <div className="w-full md:w-auto flex items-center space-x-2">
              <label className="font-semibold">Lọc Theo Giá:</label>
              <input
                type="text"
                placeholder="Từ"
                value={priceFilter.min}
                onChange={(e) => handlePriceFilterChange(e, "min")}
                className="border border-gray-300 p-2 rounded w-20"
              />
              <span>đến</span>
              <input
                type="text"
                placeholder="Đến"
                value={priceFilter.max}
                onChange={(e) => handlePriceFilterChange(e, "max")}
                className="border border-gray-300 p-2 rounded w-20"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProducts.map((item: Product) => (
              <button
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-200 hover:scale-105 overflow-hidden"
                onClick={() => navigateToDetail(item.id)}
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

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            <span className="px-4 py-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
