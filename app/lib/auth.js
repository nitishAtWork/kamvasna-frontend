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

  sendLoginOTP(data) {
    return apiRequest("/auth/login/send-otp", {
      method: "POST",
      body: data,
    });
  },

  verifyLoginOTP(data) {
    return apiRequest("/auth/login/verify-otp", {
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

  changePassword(data) {
    return apiRequest("/auth/change-password", {
      method: "POST",
      body: data,
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

  verifyResetOTP(data) {
    return apiRequest(
      "/auth/verify-reset-otp",
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