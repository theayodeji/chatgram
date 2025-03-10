import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("Error checking auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });

    try {
        const res = await axiosInstance.post("/auth/signup", formData);
        set({ authUser: res.data });
        toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Error Logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.updatedUser});
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));

// mumu pw 344444444