import { create } from "zustand";
import axios from 'axios';
import { BASE_URL_PUBLIC } from '../service/config'

export const useLegitUser = create((set) => ({
    user: null,
    success: false,

    async userLogout() {
      try {
        let response = await axios.get(BASE_URL_PUBLIC+'logout', { 
            withCredentials: true 
        });
            const data = response.data;
            if (data.success) {
                set({ success: false, user: null });
            }
        } catch (error) {
          console.error(error)
        }
    },
    
    async fetchUser() { 
      try {
        const response = await axios.get(BASE_URL_PUBLIC+'validate-token', { 
            withCredentials: true 
        });
        const data = response.data;

        set({ success: data.success, user: data.user });

      } catch (err) {
        set({ success: false, user: null });
      }
    }
}));


