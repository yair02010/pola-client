    import { createContext, useContext, useEffect, useState } from "react";

    const CartContext = createContext();

    export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        // Load from localStorage on first load
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        // Save to localStorage whenever cart changes
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === product._id);
        if (existingItem) {
            return prevCart.map((item) =>
            item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
        prevCart.map((item) =>
            item._id === productId ? { ...item, quantity } : item
        )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
        value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }}
        >
        {children}
        </CartContext.Provider>
    );
    }

    export function useCart() {
    return useContext(CartContext);
    }
