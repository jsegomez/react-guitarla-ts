import { useEffect, useMemo, useState } from "react";
import { db, type Guitar } from "../data/db";

export default function useCart() {
    const guitars: Guitar[] = db;
    const [cart, setCart] = useState<Guitar[]>(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const cartTotal:number = useMemo(() => {
        return cart.reduce((total: number, item: Guitar) => total + (item.price * (item.quantity || 0)), 0)
      }, [cart]);

    function addToCart(guitar: Guitar) {
        setCart((prev: Guitar[]) => {
            const exists = prev.some(item => item.id === guitar.id);
            if (exists) {
                return prev.map(item =>
                    item.id === guitar.id
                        ? { ...item, quantity: item.quantity! + 1 }
                        : item
                );
            }
            return [...prev, { ...guitar, quantity: 1 }];
        });
    }

    function removeFromCart(guitarId: number) {
        setCart((prevCart: Guitar[]) => prevCart.filter(item => item.id !== guitarId));
    }

    function increaseQuantity(guitarId: number) {
        setCart((prevCart: Guitar[]) =>
            prevCart.map(item => {
                if (item.id === guitarId) {
                    return { ...item, quantity: item.quantity! + 1 };
                }
                return item;
            })
        );
    }

    function decreaseQuantity(guitarId: number) {
        setCart((prevCart: Guitar[]) =>
            prevCart.map(item => {
                if (item.id === guitarId && item.quantity! > 1) {
                    return { ...item, quantity: item.quantity! - 1 };
                }
                return item;
            })
        );
    }

    function clearCart() {
        setCart([]);
    }

    return {
        cart,
        guitars,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, 
        cartTotal
    }
}