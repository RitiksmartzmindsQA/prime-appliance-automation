import "dotenv/config";

function loginUrlFor(url) {
  return url
    ? new URL("/login", url)
        .toString()
    : url;
}

export const portals = {
  rja: {
    name: "rja",
    url: process.env.RJA_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  compliance: {
    name: "compliance",
    url: process.env.COMPLIANCE_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  ivd: {
    name: "ivd",
    url: process.env.IVD_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  sa: {
    name: "sa",
    url: process.env.SA_URL,
    loginUrl: loginUrlFor(process.env.SA_URL),
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  sap: {
    name: "sap",
    url: process.env.SAP_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  pricing: {
    name: "pricing",
    url: process.env.PRICING_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  ptp: {
    name: "ptp",
    url: process.env.PTP_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  b2b: {
    name: "b2b",
    url: process.env.B2B_URL,
    email: process.env.COMMON_EMAIL,
    otpEmailSubject: "Prime B2C-Portal Notification",
    authenticatedSelector: "#sidebar",
  },

  b2c: {
    name: "b2c",
    url: process.env.B2C_URL,
    email: process.env.COMMON_EMAIL,
  },

  soi: {
    name: "soi",
    url: process.env.SOI_URL,
    loginUrl: loginUrlFor(process.env.SOI_URL),
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },

  pap: {
    name: "pap",
    url: process.env.PAP_URL,
    email: process.env.COMMON_EMAIL,
    authenticatedSelector: "#sidebar",
  },
};
