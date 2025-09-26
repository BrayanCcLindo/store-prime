import React from "react";
import { ProductType } from "@/type/productType";
import ProductCard from "./product-card";

export default function ProductList({
  products,
  title
}: {
  products: ProductType[];
  title: string;
}) {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title} </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            // <div key={product.slug}>
            //   <h2 key={product.slug}>{product.name}</h2>
            //   {product.images.map(image => (
            //     <Image
            //       src={image}
            //       alt="image product"
            //       width={350}
            //       height={350}
            //       key={image}
            //     />
            //   ))}
            // </div>
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>no se encontro data</div>
      )}
    </div>
  );
}
