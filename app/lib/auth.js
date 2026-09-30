import { apiRequest } from "@/app/lib/api";

export const authApi = {
  register(data) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  verifyEmail(data) {
    return apiRequest(
      "/auth/verify-email",
      {
        method: "POST",
        body: data,
      }
    );
  },

  login(data) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  refresh() {
    return apiRequest(
      "/auth/refresh",
      {
        method: "POST",
      },
      false
    );
  },

  me() {
    return apiRequest("/auth/me");
  },

  logout() {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },

  forgotPassword(data) {
    return apiRequest(
      "/auth/forgot-password",
      {
        method: "POST",
        body: data,
      }
    );
  },

  resetPassword(data) {
    return apiRequest(
      "/auth/reset-password",
      {
        method: "POST",
        body: data,
      }
    );
  },
};