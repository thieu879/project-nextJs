"use client";
import React, { useEffect, useState } from "react";
import Sidebars from "../../../../components/admin/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faWrench,
  faSortUp,
  faSortDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/stores/store";
import Swal from "sweetalert2";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../../redux/service/productManagement.service";

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
  const products = useSelector((state: RootState) => state.products.product);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [sortedProduct, setSortedProducts] = useState<Product[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedProducts(filteredProducts);
  }, [products, searchQuery]);

  const handleSort = (key: keyof Product) => {
    const sorted = [...sortedProduct].sort((a: any, b: any) => {
      if (sortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setSortedProducts(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Hành động này sẽ xoá sản phẩm này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xoá",
    });

    if (result.isConfirmed) {
      dispatch(deleteProduct(id))
        .then(() => {
          Swal.fire("Đã Xoá!", "Sản phẩm đã được xoá.", "success");
        })
        .catch(() => {
          Swal.fire("Lỗi!", "Không thể xoá sản phẩm.", "error");
        });
    }
  };

  const handleOpenModal = (product: Product | null = null) => {
    setCurrentProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const image = formData.get("image")?.toString() || "";
    const stock = Number(formData.get("stock")) || 0;
    const price = formData.get("price")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    if (currentProduct) {
      dispatch(
        updateProduct({
          ...currentProduct,
          name,
          image,
          stock,
          price,
          description,
        })
      )
        .then(() => {
          Swal.fire(
            "Cập Nhật Thành Công!",
            "Sản phẩm đã được cập nhật.",
            "success"
          );
          handleCloseModal();
        })
        .catch(() => {
          Swal.fire("Lỗi!", "Không thể cập nhật sản phẩm.", "error");
        });
    } else {
      dispatch(addProduct({ name, image, stock, price, description }))
        .then(() => {
          Swal.fire("Thêm Thành Công!", "Sản phẩm đã được thêm.", "success");
          handleCloseModal();
        })
        .catch(() => {
          Swal.fire("Lỗi!", "Không thể thêm sản phẩm.", "error");
        });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(sortedProduct.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProduct.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebars />
      <div className="p-4 ml-auto mr-auto w-full max-w-6xl">
        <button
          onClick={() => handleOpenModal()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Thêm Sản Phẩm
        </button>
        <form className="mb-6 flex items-center space-x-4">
          <label htmlFor="search" className="text-lg font-medium">
            Tìm Kiếm Sản Phẩm:
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full max-w-md"
            placeholder="Nhập tên sản phẩm..."
          />
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">STT</th>
                <th
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Tên
                  <FontAwesomeIcon
                    icon={sortOrder === "asc" ? faSortUp : faSortDown}
                    className="ml-2"
                  />
                </th>
                <th className="px-4 py-2 border">Ảnh</th>
                <th
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => handleSort("stock")}
                >
                  Số Lượng
                </th>
                <th
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  Giá
                </th>
                <th
                  className="px-4 py-2 border cursor-pointer w-[400px]"
                  onClick={() => handleSort("description")}
                >
                  Mô Tả
                </th>
                <th className="px-4 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <td className="px-4 py-2 border">{startIdx + index + 1}</td>
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border">
                      {(typeof product.price === "string"
                        ? parseFloat(product.price)
                        : product.price
                      ).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="px-4 py-2 border">{product.description}</td>
                    <td className="px-4 py-2 border">
                      <FontAwesomeIcon
                        icon={faWrench}
                        className="cursor-pointer mr-2 text-blue-500"
                        title="Sửa"
                        onClick={() => handleOpenModal(product)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer text-red-500"
                        title="Xoá"
                        onClick={() => handleDelete(product.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Không tìm thấy sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
          >
            Sau <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Tên Sản Phẩm
                </label>
                <input
                  name="name"
                  defaultValue={currentProduct?.name || ""}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Ảnh</label>
                <input
                  name="image"
                  defaultValue={currentProduct?.image || ""}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Số Lượng</label>
                <input
                  name="stock"
                  type="number"
                  defaultValue={currentProduct?.stock || 0}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Giá</label>
                <input
                  name="price"
                  defaultValue={currentProduct?.price || ""}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Mô Tả</label>
                <textarea
                  name="description"
                  defaultValue={currentProduct?.description || ""}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {currentProduct ? "Cập Nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
