import ProductList from "@/components/product/product-list";
import { Button } from "@/components/ui/button";
import { latestProducts } from "@/lib/actions/product.actions";
import React from "react";
// import sampleData from "@/db/sample-data";

export const metadata = {
  title: "Home",
  description: "Home page"
};
export default async function Home() {
  const products = await latestProducts(5);
  return (
    <>
      <Button variant="destructive">page</Button>
      <ProductList products={products} title="Hola como estas" />
    </>
  );
}
