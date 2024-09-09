"use client"
import React, { useState } from "react";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import "../../../style/home.css"
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/1.png?alt=media&token=ffcc70fa-45c7-4241-b9fe-dbf72388335e",
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/2.png?alt=media&token=89696a97-a474-4d5f-b5b4-6145dbf5e53e",
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/3.png?alt=media&token=d339e2c9-497c-4474-a993-2e27ab02082c",
  ];
  

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 1000);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 1000);
  };
  return (
    <div>
      <div>
        <title>Bán Hàng Trực Tuyến</title>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
        />
        <Header></Header>
        <div>
          <div>
            <div className="slider">
              <div className="image-container">
                <img
                  className={`slider-image ${fade ? "fade-out" : "fade-in"}`}
                  width="800px"
                  src={images[currentIndex]}
                  alt="slider"
                />
                <div className="icon-slider">
                  <button
                    onClick={handlePrev}
                    className="slider-button"
                    aria-label="Previous"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={handleNext}
                    className="slider-button"
                    aria-label="Next"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
