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
    // Create a shallow copy of the products array to avoid mutating the original array
    let filteredProducts = [...product];

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((item: Product) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (priceFilter.min || priceFilter.max) {
      const minPrice = priceFilter.min ? parseFloat(priceFilter.min) : 0;
      const maxPrice = priceFilter.max ? parseFloat(priceFilter.max) : Infinity;

      filteredProducts = filteredProducts.filter(
        (item: Product) =>
          parseFloat(item.price) >= minPrice &&
          parseFloat(item.price) <= maxPrice
      );
    }

    // Sort products
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

  const displayedProducts = filterAndSortProducts();

  return (
    <div>
      <Header />
      <div>
        <div>
          <label htmlFor="search">Tìm Kiếm: </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name-asc">Sắp Xếp Theo Tên (A-Z)</option>
            <option value="name-desc">Sắp Xếp Theo Tên (Z-A)</option>
            <option value="price-asc">Sắp Xếp Theo Giá Tăng Dần</option>
            <option value="price-desc">Sắp Xếp Theo Giá Giảm Dần</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="price-range">Lọc Sản Phẩm Theo Giá Tiền</label>
          <input
            type="text"
            placeholder="Từ"
            value={priceFilter.min}
            onChange={(e) => handlePriceFilterChange(e, "min")}
            className="border border-gray-300 p-2 rounded mx-2"
          />
          đến
          <input
            type="text"
            placeholder="Đến"
            value={priceFilter.max}
            onChange={(e) => handlePriceFilterChange(e, "max")}
            className="border border-gray-300 p-2 rounded mx-2"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center py-8 gap-4">
        {displayedProducts?.map((item: Product) => (
          <button
            key={item.id}
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
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
      <Footer />
    </div>
  );
}
