import { create } from "zustand";
import axios from 'axios';
import { BASE_URL_PUBLIC } from '../service/config'

export const useLegitUser = create((set) => ({

    user: null,
    success: false,
    isAdmin: false,
    isCreator: false,

    async userLogout(navigate) {
      try {
        let response = await axios.get(BASE_URL_PUBLIC+'logout', { 
            withCredentials: true 
        });
            const logout = response.data;
            if (logout.success) {
              set({
                success: false,
                user: null,
                isAdmin: false,
                isCreator: false,
              });                
              navigate("/");
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

        if (data.success) {
          set({
            success: data.success,
            user: data.user,
            isAdmin: data.isAdmin,
            isCreator: data.isCreator,
          });
        } else {
          set({
            success: false,
            user: null,
            isAdmin: false,
            isCreator: false,
          });
        }


      } catch (err) {
        set({
          success: false,
          user: null,
          isAdmin: false,
          isCreator: false,
        });
      }
    }
}));


