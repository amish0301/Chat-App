// admin stuff
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "admin";
const userSocketIDs = new Map();

module.exports = {
  adminSecretKey,
  userSocketIDs,
};