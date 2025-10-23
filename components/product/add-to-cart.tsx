"use client";
import { CardItem } from "@/type/productType";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

export default function AddToCart({ item }: { item: CardItem }) {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (res.success) {
      toast.success(res.message, {
        duration: 3000,
        position: "top-right",
        action: {
          label: "Ver carrito",
          onClick: () => router.push("/cart")
        }
      });
    } else {
      toast.error("Hubo un error, intentalo más tarde", {
        duration: 2000,
        position: "top-right"
      });
    }
  };
  return (
    <Button type="button" onClick={handleAddToCart}>
      Add to cart
    </Button>
  );
}
