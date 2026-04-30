import { create } from "zustand";
import toast from "react-hot-toast";
import instance from "../utils/axios.js";
export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  loggedInUser: null,

  setLoggedInUser: (user) => {
    set({ loggedInUser: user });
  },

  register: async (formData) => {
    try {
      set({ isLoading: true });
      const res = await instance.post("/register", formData);
      set({ isLoading: false });
      toast.success(res?.data?.message || "Registration successful");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (formData) => {
    try {
      set({ isLoading: true });
      const res = await instance.post("/login", formData);
      set({ user: formData });
      set({ isLoading: false });
      toast.success(res?.data?.message || "Logged in successfully");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },
}));
