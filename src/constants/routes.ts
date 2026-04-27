/**
 * Centralised route constants.
 * Import these instead of hard-coding URLs so refactors stay safe.
 */
export const ROUTES = {
  home: "/",

  // Marketing
  marketing: {
    home: "/",
    about: "/about",
    contact: "/contact",
    pricing: "/pricing",
  },

  // Auth
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },

  // Dashboard
  dashboard: {
    root: "/dashboard",
    analytics: "/analytics",
    campaigns: "/campaigns",
    inbox: "/inbox",
    leads: "/leads",
    leadDetail: (id: string) => `/leads/${id}`,
    meetings: "/meetings",
    settings: "/settings",
  },
} as const;
