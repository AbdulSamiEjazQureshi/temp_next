"use client";

const { createContext, useState, use } = require("react");

const basketDefaultState = {
  items: new Map(),
  addItemToBasket: (item, quantity) => {},
  removeItemFromBasket: (item) => {},
};

const BasketContext = createContext(basketDefaultState);

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(new Map());

  const addItemToBasket = (item, quantity) => {
    const itemKey = item.id;

    setItems((prevBasket) => {
      const updatedBasket = new Map(prevBasket);
      const updatedQuantity =
        Number(updatedBasket.get(itemKey)?.quantity || 0) + quantity;
      updatedBasket.set(itemKey, { item, quantity: updatedQuantity });
      return updatedBasket;
    });
  };

  const removeItemFromBasket = (item) => {
    const itemKey = item.id;

    setItems((prevBasket) => {
      const updatedBasket = new Map(prevBasket);
      const quantity = (updatedBasket.get(itemKey) || 0) - 1;
      if (quantity != 0) {
        updatedBasket.set(itemKey, { item, quantity });
      } else {
        updatedBasket.delete(itemKey);
      }
      return updatedBasket;
    });
  };

  return (
    <BasketContext.Provider
      value={{ items, addItemToBasket, removeItemFromBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketProvider = () => {
  const { items, addItemToBasket, removeItemFromBasket } = use(BasketContext);

  return {
    items,
    addItemToBasket,
    removeItemFromBasket,
  };
};
