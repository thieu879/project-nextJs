"use client"
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
import { storage } from "../../../../config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    const sorted = [...sortedProduct].sort((a, b) => {
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
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const image = currentProduct ? currentProduct.image : "";
    const stock = Number(formData.get("stock")) || 0;
    const price = formData.get("price")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      if (currentProduct) {
        dispatch(
          updateProduct({
            ...currentProduct,
            name,
            image: imageUrl,
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
        dispatch(
          addProduct({ name, image: imageUrl, stock, price, description })
        )
          .then(() => {
            Swal.fire("Thêm Thành Công!", "Sản phẩm đã được thêm.", "success");
            handleCloseModal();
          })
          .catch(() => {
            Swal.fire("Lỗi!", "Không thể thêm sản phẩm.", "error");
          });
      }
    } else {
      if (currentProduct) {
        dispatch(
          updateProduct({
            ...currentProduct,
            name,
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
    }
  };


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
                  Tên Sản Phẩm{" "}
                  {sortOrder === "asc" ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  )}
                </th>
                <th className="px-4 py-2 border">Ảnh</th>
                <th className="px-4 py-2 border">Số Lượng</th>
                <th className="px-4 py-2 border">Giá</th>
                <th className="px-4 py-2 border w-[400px]">Mô Tả</th>
                <th className="px-4 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + startIdx + 1}</td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border">{product.stock}</td>
                  <td className="px-4 py-2 border">{product.price}</td>
                  <td className="px-4 py-2 border">{product.description}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="cursor-pointer mr-2 text-blue-500"
                    >
                      <FontAwesomeIcon icon={faWrench} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            className="px-4 py-2 bg-gray-300 rounded-md"
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Trang Trước
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-300 rounded-md"
            disabled={currentPage === totalPages}
          >
            Trang Sau <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-semibold mb-4">
                {currentProduct ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <label className="block mb-2">Tên Sản Phẩm:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentProduct?.name || ""}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                />

                <label className="block mb-2 mt-4">Ảnh:</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />

                <label className="block mb-2 mt-4">Số Lượng:</label>
                <input
                  type="number"
                  name="stock"
                  defaultValue={currentProduct?.stock || 0}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                />

                <label className="block mb-2 mt-4">Giá:</label>
                <input
                  type="text"
                  name="price"
                  defaultValue={currentProduct?.price || ""}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                />

                <label className="block mb-2 mt-4">Mô Tả:</label>
                <textarea
                  name="description"
                  defaultValue={currentProduct?.description || ""}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full"
                ></textarea>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Hủy
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
    </div>
  );
}
