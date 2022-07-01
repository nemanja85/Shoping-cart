import { createContext, useContext, useState } from 'react';

type ShoppingCartContextProps = {
  getItems: (id: number) => number;
  increaseCart: (id: number) => void;
  decreaseCart: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

const shoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(shoppingCartContext);
}

export function shoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem>();
  return <shoppingCartContext.Provider value={}>{children}</shoppingCartContext.Provider>;
}
