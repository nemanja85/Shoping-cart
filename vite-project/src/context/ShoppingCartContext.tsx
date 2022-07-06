import { createContext, useContext, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartContextProps = {
  openCart: () => void
  closeCart: () => void
  getItems: (id: number) => number;
  increaseCart: (id: number) => void;
  decreaseCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number
  cartItems: CartItem[]
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
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart",[]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

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
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
}
