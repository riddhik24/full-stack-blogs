import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstane } from "../utils/axios";
import { useAuthStore } from "../store/useAuthStore";
const useChatStore = create((set, get) => ({
  users: [],
  fetchingUsers: false,
  selectedUser: null,
  messages: [],
  fetchingMessages: false,

  fetchUsers: async () => {
    try {
      set({ fetchingUsers: true });
      const res = await axiosInstane.get("/message/friends");
      // console.log(res.data.data);
      set({ users: res.data.data });
    } catch (err) {
      toast.error("Error fetching users");
      console.error("Error fetching users", err);
    } finally {
      set({ fetchingUsers: false });
    }
  },

  fetchMessages: async (id) => {
    try {
      set({ fetchMessages: true });
      const res = await axiosInstane.get(`/message/${id}`);
      set({ messages: res.data.data || [] });
    } catch (err) {
      toast.error("Error fetching messages");
      console.error("Error fetching messages", err);
    } finally {
      set({ fetchMessages: false });
    }
  },

  sendMessage: async (id, text) => {
    try {
      const res = await axiosInstane.post("/message/send/" + id, { text });
      set({ messages: [...get().messages, res.data.newMessages] });
    } catch (err) {
      toast.error("Error sending message");
      console.error("Error sending message", err);
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return; // 🔥 Safety guard

    // Always turn off previous listeners before turning on a new one
    // to prevent double-listening if the effect runs twice.
    socket.off("newMessages");

    socket.on("newMessages", (newMessage) => {
      // Only add message if it belongs to the currently open chat
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unSubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessages");
  },
}));

export { useChatStore };
