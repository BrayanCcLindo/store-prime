"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function ProductImages({ images }: { images: string[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // const nextImage = () => {
  //     setSelectedImageIndex((prev) =>
  //       prev === product.images.length - 1 ? 0 : prev + 1
  //     );
  //   };

  //   const prevImage = () => {
  //     setSelectedImageIndex((prev) =>
  //       prev === 0 ? product.images.length - 1 : prev - 1
  //     );
  //   };

  //   const handleQuantityChange = (change) => {
  //     const newQuantity = quantity + change;
  //     if (newQuantity >= 1 && newQuantity <= product.stock) {
  //       setQuantity(newQuantity);
  //     }
  //   };
  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={images[selectedImageIndex]}
            alt={"product-preview"}
            width={250}
            height={250}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
                selectedImageIndex === index
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                width={150}
                height={150}
                alt={`product-preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
