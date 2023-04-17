
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartData = create(

    persist(
        (set, get) => ({

            cart: get("cart") || [],
            // cart: new Set(get("cart") ?? []),
        
            addToCart: (courseId) => {
                set((state) => ({
                    cart: [...state.cart, courseId],
                    // cart: new Set(state.cart).add(courseId),    
                }));
            },
            removeFromCart: (courseId) => {
                set((state) => {
                const newCart = new Set(state.cart);
                newCart.delete(courseId);
                return { cart: newCart };
        });
    },


        }),
        {
            name: 'cart-storage', 
            storage: createJSONStorage(() => localStorage), 
        }
    )
);


// import { create } from "zustand";

// export const useCartData = create((set) => ({

//     cart: new Set(),
    
//     addToCart: (courseId) => {
//         set((state) => ({
//             cart: new Set(state.cart).add(courseId)
//         }));
//     },

//     removeFromCart: (courseId) => {
//         set((state) => {
//             const newCart = new Set(state.cart);
//             newCart.delete(courseId);
//             return { cart: newCart };
//         });
//     },
// }));
