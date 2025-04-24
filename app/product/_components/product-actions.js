"use client";

import { useBasketProvider } from "@/app/providers/basket-provider";
import { useRef } from "react";

export default function ProductActions({ product }) {
  const quantityRef = useRef();
  const { addItemToBasket, items } = useBasketProvider();

  console.log(items);

  return (
    <div className="flex items-center gap-2">
      <input
        className="border-primary rounded-sm "
        ref={quantityRef}
        type="number"
        min={1}
        defaultValue={1}
      />
      <button
        type="button"
        onClick={() => addItemToBasket(product, quantityRef.current.value)}
      >
        Add To Basket
      </button>
    </div>
  );
}
