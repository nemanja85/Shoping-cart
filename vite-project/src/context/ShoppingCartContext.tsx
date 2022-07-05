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

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItems(id: number) {
    return cartItems.find(item => item.id)?.quantity || 0
  }

  function increaseCart(id: number) {
    setCartItems(currItems => {
      if(currItems.find(item => item.id  === id) == null) {
        return [...currItems, {id, quantity:1}]
      } else {
        return currItems.map(item => {
          if(item.id === id) {
            return { ...item, quantity: item.quantity +1 }
          }
          else {
            return item
          }
        })
      }
    })
  }

  function decreaseCart(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return ( 
  <shoppingCartContext.Provider 
  value={{
    getItems,
    increaseCart,
    decreaseCart,
    removeFromCart
  }}>
    {children}
  </shoppingCartContext.Provider>
  );
}
