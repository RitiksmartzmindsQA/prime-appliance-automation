import "dotenv/config";

export const portals = {
  rja: {
    name: "rja",
    url: process.env.RJA_URL,
    email: process.env.COMMON_EMAIL,
  },

  compliance: {
    name: "compliance",
    url: process.env.COMPLIANCE_URL,
    email: process.env.COMMON_EMAIL,
  },

  ivd: {
    name: "ivd",
    url: process.env.IVD_URL,
    email: process.env.COMMON_EMAIL,
  },

  sa: {
    name: "sa",
    url: process.env.SA_URL,
    email: process.env.COMMON_EMAIL,
  },

  sap: {
    name: "sap",
    url: process.env.SAP_URL,
    email: process.env.COMMON_EMAIL,
  },

  pricing: {
    name: "pricing",
    url: process.env.PRICING_URL,
    email: process.env.COMMON_EMAIL,
  },

  ptp: {
    name: "ptp",
    url: process.env.PTP_URL,
    email: process.env.COMMON_EMAIL,
  },

  b2b: {
    name: "b2b",
    url: process.env.B2B_URL,
    email: process.env.COMMON_EMAIL,
  },

  b2c: {
    name: "b2c",
    url: process.env.B2C_URL,
    email: process.env.COMMON_EMAIL,
  },

  soi: {
    name: "soi",
    url: process.env.SOI_URL,
    email: process.env.COMMON_EMAIL,
  },

  pap: {
    name: "pap",
    url: process.env.PAP_URL,
    email: process.env.COMMON_EMAIL,
  },
};
