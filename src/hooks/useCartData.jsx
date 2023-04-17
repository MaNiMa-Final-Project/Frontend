import { create } from "zustand";

export const useCartData = create((set) => ({

    cart: new Set(),
    
    addToCart: (courseId) => {
        set(() => ({
            cart: new Set(cart).add(courseId)
        }));
    },

    removeFromCart: (courseId) => {
        set(() => {
            const newCart = new Set(cart);
            newCart.delete(courseId);
            return { cart: newCart };
        });
    },

    

}));
