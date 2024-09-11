"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/stores/store";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import { FaTrashAlt } from "react-icons/fa";
import { removeItem } from "../../../redux/stores/reducers/cartReducer";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 14.0;
  const discount = 0.0;
  const total = subtotal + delivery - discount;

  const formatPrice = (price: number) => `₫${price.toFixed(0)}`;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <table className="table-auto w-full mb-6">
              <thead>
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Quantity</th>
                  <th className="text-left">Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md mr-4"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                      </div>
                    </td>
                    <td className="py-2">{formatPrice(item.price)}</td>
                    <td className="py-2">
                      <div className="flex items-center">
                        <span className="mx-2">{item.quantity}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <button onClick={() => handleRemoveItem(item.id)}>
                        <FaTrashAlt className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 mt-6 md:mt-0">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold">Total</h3>
              <div className="flex justify-between mt-2">
                <p>Subtotal</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Delivery</p>
                <p>{formatPrice(delivery)}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p>Discount</p>
                <p>-{formatPrice(discount)}</p>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <p>Total</p>
                <p>{formatPrice(total)}</p>
              </div>
              <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
