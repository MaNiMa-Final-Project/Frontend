
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartData = create(

    persist(
        (set, get) => ({
            cart: get("cart-storage") || [],

            addToCart: (courseId) => {
                set((state) => ({
                    cart: Array.from(new Set(state.cart).add(courseId)),
                }))
            },

            removeFromCart: (courseId) => {
                set((state) => ({
                    cart: state.cart.filter((id) => id !== courseId),
                }))
            }
        }),
        {
            name: 'cart-storage', 
            storage: createJSONStorage(() => localStorage), 
        }
    )
);


