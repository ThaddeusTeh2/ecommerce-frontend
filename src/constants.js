export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5555/api"
    : "https://b13-thaddeus24.mak3r.dev/api";
