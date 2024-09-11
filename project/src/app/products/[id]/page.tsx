"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/stores/store";
import { useEffect } from "react";
import { getProduct } from "../../../../redux/service/productManagement.service";
import Header from "../../../../components/user/Header";
import Footer from "../../../../components/user/Footer";
import { addItem } from "../../../../redux/stores/reducers/cartReducer";

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
      dispatch(
        addItem({
          id: selectedProduct.id,
          name: selectedProduct.name,
          image: selectedProduct.image,
          price: parseFloat(selectedProduct.price),
          quantity: 1,
        })
      );
    }
  };

  if (!selectedProduct) {
    return <div>Product not found</div>;
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
              <span className="ml-2 text-gray-600">4.7 (9,200 reviews)</span>
            </div>

            <div className="mb-4">
              <span className="text-3xl text-orange-600 font-bold">
                ₫{selectedProduct.price}
              </span>
              <div className="text-gray-500 line-through">
                ₫{(parseFloat(selectedProduct.price) * 1.42).toFixed(2)}
              </div>
              <div className="text-red-500">-42% Off</div>
            </div>

            <div className="mb-4">
              <span className="text-lg font-semibold">Số lượng còn lại:</span>
              <span className="text-lg ml-2">
                {selectedProduct.stock > 0
                  ? `${selectedProduct.stock}`
                  : "Out of stock"}
              </span>
            </div>

            <p className="mb-6">{selectedProduct.description}</p>

            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
