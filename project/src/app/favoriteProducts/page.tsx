"use client";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavoriteItems,
  removeItemFromFavorites,
  addItemToFavorites,
  getFavoritesItem,
  FavoriteItem,
} from "../../../redux/stores/reducers/favoriteReducer";
import { RootState } from "../../../redux/stores/store";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";

const ProductCard = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);

  useEffect(() => {
    dispatch(getFavoritesItem());
  }, [dispatch]);
  console.log(favoriteItems);
  useEffect(() => {
    const userId = 1;
    dispatch(fetchFavoriteItems(userId));
  }, [dispatch]);

  const handleRemove = (itemId: number) => {
    dispatch(removeItemFromFavorites(itemId));
  };

  const handleAdd = (item: FavoriteItem) => {
    dispatch(addItemToFavorites(item));
  };

  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-gray-600 text-sm mb-4">Watchlist</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Đi Chợ Thôi</h2>

          {favoriteItems.length > 0 ? (
            <div className="space-y-6">
              {favoriteItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start p-4 border rounded-lg shadow-md bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 object-cover rounded-lg mr-6"
                  />
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-orange-600">
                      ₫{item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 ml-6">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                      aria-label="Remove from favorites"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      onClick={() => handleAdd(item)}
                      className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
                      aria-label="Add to cart"
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Không có sản phẩm</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductCard;
