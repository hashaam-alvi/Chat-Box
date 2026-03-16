// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;

export default BASE_URL;