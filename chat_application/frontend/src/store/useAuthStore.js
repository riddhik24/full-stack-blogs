import { axiosInstane } from "../utils/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";
const BASE_URL = import.meta.env.VITE_WS_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  profileLoading: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstane.get("/user/authUser");
      set({ authUser: res.data });
      // console.log(res);
      get().connectSocket();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      const res = await axiosInstane.post("/user/register", data);
      set({ authUser: res.data });
      toast.success("Signed up successfully");
      get().connectSocket();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error signing up");
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstane.post("/user/login", data);
      // console.log(res);
      const userRes = await axiosInstane.get("/user/authUser");
      set({ authUser: userRes.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error logging in");
    }
  },

  uploadImage: async (data) => {
    try {
      const res = await axiosInstane.post("/user/profile", data);
      set({ authUser: res.data.user });
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error uploading image");
    }
  },

  logout: async () => {
    try {
      await axiosInstane.post("/user/logout");
      set({ authUser: null });
      useChatStore.getState().setSelectedUser(null);
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Error logging out", error);
    }
  },
  connectSocket: () => {
    const socket = io(BASE_URL, {
      query: {
        userId: get().authUser.data._id,
      },
    });

    socket.connect();

    set({
      socket: socket,
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    get().socket?.connected && get().socket.disconnect();
  },
}));
