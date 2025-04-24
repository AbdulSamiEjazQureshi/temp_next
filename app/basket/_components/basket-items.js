"use client";

import { useBasketProvider } from "@/app/providers/basket-provider";

export default function BasketItems() {
  const { items } = useBasketProvider();

  return <div>{JSON.stringify(items, null, 2)}</div>;
}
