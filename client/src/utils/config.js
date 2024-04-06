export const serverURI = import.meta.env.VITE_SERVER;

export const CHAT_APP_TOKEN = "uid";

export const cloudinaryConfigs = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
};

const clientUri = process.env.CLIENT_URI;
export const corsOptions = {
  origin: [clientUri, "http://localhost:3000", "http://localhost:4173"],
  credentials: true,
};
