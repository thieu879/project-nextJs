"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/stores/store";
import { useEffect } from "react";
import { getProduct } from "../../../../redux/service/productManagement.service";
import Header from "../../../../components/user/Header";
import Footer from "../../../../components/user/Footer";
import { updateProductStock } from "../../../../redux/service/productManagement.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addItemToCart } from "../../../../redux/stores/reducers/cartReducer";

const MySwal = withReactContent(Swal);

interface Props {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.product);

  useEffect(() => {
    if (params.id) {
      dispatch(getProduct());
    }
  }, [dispatch, params.id]);

  const selectedProduct = product.find(
    (item) => item.id === parseInt(params.id)
  );

  const handleAddToCart = () => {
    if (selectedProduct) {
      if (selectedProduct.stock > 0) {
        dispatch(
          addItemToCart({
            id: selectedProduct.id,
            name: selectedProduct.name,
            image: selectedProduct.image,
            price: parseFloat(selectedProduct.price),
            quantity: 1,
          })
        );

        const updatedStock = selectedProduct.stock - 1;
        dispatch(
          updateProductStock({ id: selectedProduct.id, stock: updatedStock })
        );

        MySwal.fire({
          icon: "success",
          title: "Đã Thêm Vào Giỏ",
          text: `${selectedProduct.name} đã được thêm vào giỏ hàng của bạn.`,
          confirmButtonText: "OK",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Hết Hàng",
          text: "Sản phẩm này hiện tại không còn hàng.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (!selectedProduct) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center mb-4">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="ml-2 text-gray-600">4.7 (9.200 đánh giá)</span>
            </div>

            <div className="mb-4">
              <span className="text-3xl text-orange-600 font-bold">
                ₫{selectedProduct.price}
              </span>
              <div className="text-gray-500 line-through">
                ₫{(parseFloat(selectedProduct.price) * 1.42).toFixed(2)}
              </div>
              <div className="text-red-500">-42% Giảm Giá</div>
            </div>

            <div className="mb-4">
              <span className="text-lg font-semibold">Số lượng còn lại:</span>
              <span className="text-lg ml-2">
                {selectedProduct.stock > 0
                  ? `${selectedProduct.stock}`
                  : "Hết hàng"}
              </span>
            </div>

            <p className="mb-6">{selectedProduct.description}</p>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors duration-200"
              >
                Thêm Vào Giỏ Hàng
              </button>
              <button className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
